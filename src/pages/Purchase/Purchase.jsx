import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Spin, Button } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';
import { fetchOrders, fetchOrderShipped, fetchOrderCanceled, fetchOrderPending, updateOrderStatus } from '../../redux/OrderSlice';
import { UserServices } from '../../services/UserService';
import { BASE_URL_IMG } from '../../services/config';
import { ProductService } from '../../services/productService';
import logoMona from '../../asset/img/Group 16.svg';
import no_orders from '../../asset/img/no_orders.png'; // Path to your image
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TruckOutlined } from '@ant-design/icons';
import GetMoreInfo from '../HomePage/GetMoreInfo/GetMoreInfo';
import { FaCreditCard } from 'react-icons/fa';
const Purchase = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [orderProductDetails, setOrderProductDetails] = useState([]);
  const [productImages, setProductImages] = useState({});
  const dispatch = useDispatch();
  const deliveredOrders = useSelector((state) => state.order.deliveredOrders);
  const shippedOrders = useSelector((state) => state.order.shippedOrders);
  const canceledOrders = useSelector((state) => state.order.canceledOrders);
  const pendingOrders = useSelector((state) => state.order.pendingOrders);
  const status = useSelector((state) => state.order.status);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchOrderPending());
    dispatch(fetchOrderShipped());
    dispatch(fetchOrderCanceled());
  }, [dispatch]);

  useEffect(() => {
    UserServices.getOrderDetail()
      .then((res) => setOrderProductDetails(res.data))
      .catch((error) => console.error('Error fetching order details:', error));
  }, [deliveredOrders, shippedOrders, canceledOrders, pendingOrders]);

  // Fetch product images
  useEffect(() => {
    const fetchProductImages = async () => {
      const productImagesMap = {};
      const uniqueProductIds = [...new Set(orderProductDetails.map((detail) => detail.product_id))];

      await Promise.all(
        uniqueProductIds.map(async (productId) => {
          const res = await ProductService.getProductImageByProductId(productId);
          productImagesMap[productId] = res.data[0]?.image_url || '';
        })
      );

      setProductImages(productImagesMap);
    };

    if (orderProductDetails.length > 0) {
      fetchProductImages();
    }
  }, [orderProductDetails]);

  const orderData = (orders) =>
    orders
      .map((order) => ({
        key: order.order_id,
        ...order,
        products: orderProductDetails.filter((detail) => detail.order_id === order.order_id),
      }))
      .sort((a, b) => new Date(b.order_date) - new Date(a.order_date)); // Sort orders by date, most recent first

  const getOrderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <>
            <ClockCircleOutlined className="text-yellow-500" /> <span className="text-yellow-500">Đang xử lý</span>
          </>
        );
      case 'shipped':
        return (
          <>
            <TruckOutlined className="text-blue-500" /> <span className="text-blue-500">Đã vận chuyển</span>
          </>
        );
      case 'delivered':
        return (
          <>
            <CheckCircleOutlined className="text-green-500" /> <span className="text-green-500">Đã giao</span>
          </>
        );
      case 'canceled':
        return (
          <>
            <CloseCircleOutlined className="text-red-500" /> <span className="text-red-500">Đã hủy</span>
          </>
        );
      default:
        return '';
    }
  };

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn hủy đơn hàng?',
      text: 'Hành động này không thể hoàn tác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hủy đơn hàng',
      cancelButtonText: 'Hủy bỏ'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(updateOrderStatus({ orderId, status: 'Cancel' })).unwrap();
        Swal.fire({
          title: 'Thành công',
          text: 'Đơn hàng đã được hủy thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setActiveTab('canceled');
        dispatch(fetchOrderPending());
        dispatch(fetchOrderCanceled());
      } catch (error) {
        console.error('Error canceling order:', error);
        Swal.fire({
          title: 'Lỗi',
          text: 'Có lỗi xảy ra khi hủy đơn hàng',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleConfirmReceived = async (orderId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc đã nhận được hàng?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy bỏ'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(updateOrderStatus({ orderId, status: 'delivered' })).unwrap();
        Swal.fire({
          title: 'Thành công',
          text: 'Đã xác nhận nhận hàng',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setActiveTab('delivered');
        dispatch(fetchOrderShipped());
        dispatch(fetchOrders());
      } catch (error) {
        console.error('Error confirming order received:', error);
        Swal.fire({
          title: 'Lỗi',
          text: 'Có lỗi xảy ra khi xác nhận nhận hàng',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const renderOrderTable = (orders) => (
    <div className="overflow-x-auto border-x border-b border-[#ddd] px-4 pb-4">
      <div className="px-6 pt-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center border-[2px] border-[#c89979] px-6 py-24 mb-6">
            <img src={no_orders} alt="No orders" className="mb-4 h-28 w-24" />
            <p className="text-lg">Chưa có đơn hàng nào</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={order.order_id || index} className="border-[2px] border-[#c89979] px-6 py-4 mb-6">
              <div className="pb-2 border-b border-gray-200 flex justify-between items-center">
                <p className="flex items-center text-base font-bold text-[#353535]">
                  m <img className="h-4 w-6" src={logoMona} alt="" /> na Store
                </p>
                <p className="text-sm flex items-center gap-1">
                  {getOrderStatus(order.status)}
                </p>
              </div>
              <div className="pt-2 pb-4">
                <span className="text-sm text-gray-500">Ngày đặt hàng: {moment(order.order_date).format("D MMM YYYY")}</span>
              </div>
              {order.products.map((product) => (
                <div key={product.product_id} className="flex gap-4 mb-1 pt-2 items-center justify-between">
                  <div className="flex">
                    <Avatar
                      src={productImages[product.product_id] ? `${BASE_URL_IMG}${productImages[product.product_id]}` : null}
                      className="w-20 h-20 object-cover"
                      shape="square"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="text-sm font-semibold text-[#353535]">{product.products?.product_name || 'N/A'}</div>
                      <div className="text-[.9em] normal-case tracking-normal text-[#353535]">{product.products?.description}</div>
                      <div className="text-sm text-gray-500">x{product.quantity}</div>
                      <div className="border-[#c89979] text-[#c89979] rounded-[1px] border-solid border-[0.8px] inline text-[12px] leading-[16px]">
                        Trả hàng miễn phí 7 ngày
                      </div>
                    </div>
                  </div>
                  <span className="text-[#111] font-bold text-[.9em]">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
              ))}
              <div className="text-[.9em] normal-case tracking-normal text-[#353535] text-end flex items-center justify-end gap-1">
                <FaCreditCard color="#d26e4b" size={16} />
                Thành tiền: <span className="text-[#d26e4b] font-bold text-[1.2em]">{order.products.reduce((acc, product) => acc + product.quantity * product.price, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
              {order.status === 'pending' && (
                <div className="text-end">
                  <button danger onClick={() => handleCancelOrder(order.order_id)} className="mt-4 px-4 py-2 bg-[#c89979] hover:bg-[#b98969] transition-all duration-300 text-[#fff] text-sm font-medium tracking-widest font-[roboto]">
                  Hủy đơn hàng
                </button>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className="text-end">
                  <button onClick={() => handleConfirmReceived(order.order_id)} className="mt-4 px-4 py-2 bg-[#c89979] hover:bg-[#b98969] transition-all duration-300 text-[#fff] text-sm font-medium tracking-widest font-[roboto]">
                    Đã nhận được hàng
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 container mx-auto">
      <div className="pt-10">
        <nav className="flex space-x-2 border-b border-[#ddd]">
          {['pending', 'shipped', 'delivered', 'canceled'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-5 font-medium text-sm transition-all duration-500 ${
                activeTab === tab
                  ? 'border-t-[#d26e4b] text-[#d26e4b] border-t-2 border-x border-[#ddd]'
                  : 'text-[#666666] hover:text-gray-700 hover:border-gray-300 bg-[#f5f5f5] border-x border-t border-[#ddd]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'pending' && 'Đang xử lý'}
              {tab === 'shipped' && 'Đã vận chuyển'}
              {tab === 'delivered' && 'Đã giao'}
              {tab === 'canceled' && 'Đã hủy'}
            </button>
          ))}
        </nav>
      </div>
      <div className="transition-all duration-500">
        {status === 'loading' && <Spin size="large" />}
        {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
        {activeTab === 'pending' && renderOrderTable(orderData(pendingOrders))}
        {activeTab === 'shipped' && renderOrderTable(orderData(shippedOrders))}
        {activeTab === 'delivered' && renderOrderTable(orderData(deliveredOrders))}
        {activeTab === 'canceled' && renderOrderTable(orderData(canceledOrders))}
      </div>
      <div className="pt-[70px]">
        <GetMoreInfo />
      </div>
    </div>
  );
};

export default Purchase;
