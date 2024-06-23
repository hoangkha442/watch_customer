// src/components/CartSummary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ subtotal, handleCheckout }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Tổng Số Lượng</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Tổng phụ</span>
          <span className="font-medium">{subtotal.toLocaleString()} ₫</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Giao hàng</span>
          <div className="text-right">
            <span>Giao hàng miễn phí</span>
            <p>Ước tính cho <strong>Việt Nam</strong>.</p>
            <a href="#" className="text-blue-500">Đổi địa chỉ</a>
          </div>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Tổng</span>
          <span className="font-medium">{subtotal.toLocaleString()} ₫</span>
        </div>
      </div>
      <button onClick={() => navigate('/thanh-toan')} className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg mb-4">TIẾN HÀNH THANH TOÁN</button>
      <div>
        <h3 className="text-lg font-bold mb-2">Phiếu ưu đãi</h3>
        <div className="flex">
          <input type="text" className="flex-grow p-2 border rounded-l-lg" placeholder="Mã ưu đãi" />
          <button className="px-4 py-2 bg-gray-300 text-gray-700 border rounded-r-lg">Áp dụng</button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
