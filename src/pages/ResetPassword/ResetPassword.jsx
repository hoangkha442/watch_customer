import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserServices } from '../../services/UserService';
import Swal from 'sweetalert2';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const validatePassword = (password) => password.length > 0;

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setFormError('');
    setPasswordError(validatePassword(e.target.value) ? '' : 'Mật khẩu không được để trống.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || !newPassword) {
      setFormError('Vui lòng nhập đúng các thông tin bên dưới.');
      return;
    }

    try {
      await UserServices.resetPassword({ token, newPassword });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đặt lại mật khẩu thành công!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate('/dang-nhap'); // Redirect to login page after showing the success message
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
        <h2 className="text-xl font-bold text-left text-[#1c1c1c]">ĐẶT LẠI MẬT KHẨU</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-bold text-[#222] mb-2">
              Mật khẩu mới *
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
              value={newPassword}
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
              Đặt lại mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
