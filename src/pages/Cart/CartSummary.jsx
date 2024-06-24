// src/components/CartSummary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocalOffer } from 'react-icons/md';
const CartSummary = ({ subtotal, handleCheckout }) => {
  const navigate = useNavigate();

  return (
    <div className="border-l pl-6">
      <h2 className="text-sm font-bold pb-[9px] uppercase text-[#353535] border-b-[3px]">Tổng Số Lượng</h2>
      <div className="my-4">
        <div className="flex justify-between mb-2 border-b pb-2">
          <span className='text-[.9em] normal-case tracking-normal text-[#353535]'>Tổng phụ</span>
          <span className="font-bold text-[.9em] text-[#111]">{subtotal.toLocaleString()} ₫</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className='text-[.9em] normal-case tracking-normal text-[#353535]'>Giao hàng</span>
          <div className="text-right">
            <span className='text-[13px] normal-case tracking-wide text-[#666666]'>Giao hàng miễn phí</span>
            <p className='text-[13px] normal-case tracking-wide text-[#666666] py-2'>Ước tính cho <strong className='font-bold text-[#666666]'>Việt Nam</strong>.</p>
            <a href="#" className="text-[13px] normal-case tracking-wide text-[#666666]">Đổi địa chỉ</a>
          </div>
        </div>
        <div className="flex justify-between  border-t pt-2">
          <span className='text-[.9em] normal-case tracking-normal text-[#353535]'>Tổng</span>
          <span className="font-bold text-[.9em] text-[#111]">{subtotal.toLocaleString()} ₫</span>
        </div>
      </div>
      <button onClick={() => navigate('/thanh-toan')} className="w-full py-2 bg-[#d26e4b] text-white font-bold rounded-sm text-[15.52px] mb-4">TIẾN HÀNH THANH TOÁN</button>
      <div>
        <h3 className="text-lg font-bold mb-2 flex gap-3 items-center border-b-[3px] border-[#ececec] text-[.95em] pb-2"> <MdLocalOffer className="text-[#b5b5b5] text-[18px] inline ml-2 rotate-90" title="Coupon" />Phiếu ưu đãi</h3>
        <div className=" pt-2">
          <input type="text" className="box-border border border-[#ddd] px-3 h-[2.507em] text-[.97em] rounded-none max-w-full w-full align-middle bg-white text-[#333] shadow-inner transition-all transition-border transition-background duration-300" placeholder="Mã ưu đãi" />
          <button className="mt-4 box-border border border-[#ddd] px-3 h-[2.507em] text-[.97em] rounded-none max-w-full w-full align-middle bg-[#f9f9f9] hover:bg-[#dedede] text-[#6a6a6a] shadow-inner transition-all transition-border transition-background duration-300">Áp dụng</button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
