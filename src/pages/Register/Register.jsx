import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserServices } from '../../services/UserService';
import { setLogin } from '../../redux/UserSlice';
import { userLocalStorage } from '../../services/LocalService';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length > 0;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError('');
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFormError('');
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setFormError('');
  };

  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password) || !fullName || !phone) {
      setFormError('Vui lòng nhập đúng các thông tin bên dưới.');
      return;
    }

    try {
      const response = await UserServices.signup({ email, password, full_name: fullName, phone });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng ký thành công!',
        showConfirmButton: false,
        timer: 1000,
      });
      dispatch(setLogin(response.data));
      userLocalStorage.set(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        sessionStorage.setItem('user', JSON.stringify(response.data));
      }
      setFormError('');
      navigate('/login');

    } catch (err) {
      console.log('err: ', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.response?.data?.message || 'Đăng ký thất bại',
        showConfirmButton: false,
        timer: 1000,
      });
      setFormError('Đăng ký thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#fff] py-20">
      <div className="w-full container space-y-2 bg-[#fff]">
        <h2 className="text-xl font-bold text-left text-[#1c1c1c]">ĐĂNG KÝ</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-[#222] mb-2">
              Họ và tên *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={fullName}
              onChange={handleFullNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-[#222] mb-2">
              Địa chỉ email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-[#222] mb-2">
              Mật khẩu *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-[#222] mb-2">
              Số điện thoại *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex items-center space-x-5">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-[#c89979] hover:bg-[#ab8165] transition-all duration-300 focus:outline-none focus:shadow-outline"
            >
              ĐĂNG KÝ
            </button>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
                Ghi nhớ mật khẩu
              </label>
            </div>
          </div>
          <div className="text-left">
            <a href="/dang-nhap" className="text-[#555555] font-medium hover:text-[#333] text-base transition-all duration-300">
              Đã có tài khoản? Đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
