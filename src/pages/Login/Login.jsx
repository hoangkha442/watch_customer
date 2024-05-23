// Login.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserServices } from '../../services/UserService';
import { setLogin } from '../../redux/UserSlice';
import Swal from 'sweetalert2';
import { userLocalStorage } from '../../services/LocalService';
import { useNavigate } from 'react-router-dom';
import useFetchProfile from '../../hook/useFetchProfile';

export default function Login() {
  const Style = {
    inputForm: 'block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useFetchProfile();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 0;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormError('');
    if (!validateEmail(e.target.value)) {
      setEmailError('Email không đúng định dạng.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError('');
    if (!validatePassword(e.target.value)) {
      setPasswordError('Mật khẩu không được để trống.');
    } else {
      setPasswordError('');
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !email || !password) {
      setFormError('Vui lòng nhập đúng các thông tin bên dưới.');
      return;
    }

    try {
      const response = await UserServices.login({ email, password });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng nhập thành công!',
        showConfirmButton: false,
        timer: 1000,
      });
      dispatch(setLogin(response.data));
      userLocalStorage.set(response.data);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        sessionStorage.setItem('user', JSON.stringify(response.data));
      }
      setFormError('');
      navigate('/');
    } catch (err) {
      console.log('err: ', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
      setFormError('Đăng nhập thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#fff] py-20">
      <div className="w-full container space-y-2 bg-[#fff] ">
        <h2 className="text-xl font-bold text-left text-[#1c1c1c]">ĐĂNG NHẬP</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-[#222] mb-2">
              Tên tài khoản hoặc địa chỉ email *
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={Style.inputForm}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <div className="text-red-500">{emailError}</div>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-[#222] mb-2">
              Mật khẩu *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={Style.inputForm}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <div className="text-red-500">{passwordError}</div>}
          </div>
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex items-center space-x-5">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-[#c89979] hover:bg-[#ab8165] transition-all duration-300 focus:outline-none focus:shadow-outline"
            >
              ĐĂNG NHẬP
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
            <a href="#" className="text-[#555555] font-medium hover:text-[#333] text-base transition-all duration-300">
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
