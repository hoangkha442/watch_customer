import React, { useState } from 'react';
import { UserServices } from '../../services/UserService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormError('');
    setEmailError(validateEmail(e.target.value) ? '' : 'Email không đúng định dạng.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || !email) {
      setFormError('Vui lòng nhập đúng các thông tin bên dưới.');
      return;
    }

    try {
      await UserServices.sendResetPasswordEmail({ email });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã gửi email đặt lại mật khẩu!',
        showConfirmButton: true,
        confirmButtonText: 'Chuyển đến Gmail',
        cancelButtonText: 'Hủy',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
        } else {
          setEmail('');
          navigate('/dang-nhap');
        }
      });
      setFormError('');
    } catch (err) {
      console.log('err: ', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.response?.data?.message || 'Đặt lại mật khẩu thất bại',
        showConfirmButton: false,
        timer: 1000,
      });
      setFormError('Đặt lại mật khẩu thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#fff] py-20">
      <div className="w-full container space-y-2 bg-[#fff]">
        <h2 className="text-xl font-bold text-left text-[#1c1c1c]">QUÊN MẬT KHẨU</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-[#222] mb-2">
              Địa chỉ email *
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <div className="text-red-500">{emailError}</div>}
          </div>
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex items-center space-x-5">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-[#c89979] hover:bg-[#ab8165] transition-all duration-300 focus:outline-none focus:shadow-outline"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
