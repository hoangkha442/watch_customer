// src/components/PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BillingInformation from './BillingInformation';
import OrderSummary from './OrderSummary';

const PaymentPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userInfo);
  const cartItems = useSelector(state => state.cart.items);

  // Calculate subtotal from cart items
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

  const [provinces, setProvinces] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch provinces from the API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://vapi.vnappmob.com/api/province');
        const data = await response.json();
        setProvinces(data.results);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // Pre-fill form with user data
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

  const handlePayment = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ các thông tin bắt buộc.',
      });
      return;
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanh toán thành công!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate('/'); // Navigate to the home page or order confirmation page after payment
    });
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-6">
          <BillingInformation 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
            provinces={provinces}
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
