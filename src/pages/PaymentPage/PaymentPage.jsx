// src/components/PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BillingInformation from './BillingInformation';
import OrderSummary from './OrderSummary';
import { UserServices } from '../../services/UserService';
import { fetchCart } from '../../redux/CartSlice';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const cartItems = useSelector(state => state.cart.items);

  const subtotal = cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    fullName: '',
    country: 'Việt Nam',
    address: '',
    city: '',
    phone: '',
    email: '',
    paymentMethod: 'COD',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        fullName: user.full_name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ và tên là bắt buộc';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!formData.email) newErrors.email = 'Địa chỉ email là bắt buộc';
    if (!formData.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.city) newErrors.city = 'Tỉnh / Thành phố là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ các thông tin bắt buộc.',
      });
      return;
    }

    try {
      const orderData = {
        orders: [{
          company_id: 1,
          order_date: new Date().toISOString(),
          status: 'pending',
          total_amount: subtotal,
          details: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.products.price,
          })),
          productIDs: cartItems.map(item => item.product_id),
          paymentDetail: {
            amount: subtotal,
            payment_method: formData.paymentMethod,
            payment_status: 'pending',
          },
          shippingDetail: {
            shipping_address: formData.address,
            estimated_delivery_date: new Date().toISOString(),
          }
        }]
      };

      await UserServices.createMultipleOrders(orderData);

      const deleteItems = cartItems.map(item => ({
        cart_id: item.cart_id,
      }));
      await UserServices.deleteMultipleCartItems(deleteItems);

      dispatch(fetchCart());

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanh toán thành công!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.',
      });
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-6">
          <BillingInformation 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
          />
        </div>
        <div className="md:col-span-4">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            formData={formData}
            setFormData={setFormData}
            handlePayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
