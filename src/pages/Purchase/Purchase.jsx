import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Spin } from 'antd';
import moment from 'moment';
import { fetchOrders, fetchOrderShipped, fetchOrderCanceled, fetchOrderPending } from '../../redux/OrderSlice';
import { UserServices } from '../../services/UserService';
import { BASE_URL_IMG } from '../../services/config';
import { ProductService } from '../../services/productService';
import logoMona from '../../asset/img/Group 16.svg';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TruckOutlined } from '@ant-design/icons';

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

  const renderOrderTable = (orders) => (
    <div className="overflow-x-auto border-x border-b border-[#ddd] px-4 pb-4">
      <div className="p-6">
        <div className="">
          {orders.map((order, index) => (
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
                <div key={product.product_id} className="flex gap-4 mb-4 pt-2 items-center justify-between">
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
                <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>Shopee Guarantee</title>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z"
                    fill="#ee4d2d"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z"
                    fill="#fff"
                  ></path>
                </svg>{' '}
                Thành tiền: <span className="text-[#d26e4b] font-bold text-[1.2em]">{order.products.reduce((acc, product) => acc + product.quantity * product.price, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng</h1>
      <div className="">
        <nav className="flex space-x-2 border-b border-[#ddd]">
          {['pending', 'shipped', 'delivered', 'canceled'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-3 font-medium text-sm transition-all duration-500 ${
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
    </div>
  );
};

export default Purchase;
