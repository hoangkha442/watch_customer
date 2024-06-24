// src/components/OrderSummary.js
import React from 'react';

const OrderSummary = ({ cartItems, subtotal, formData, setFormData, handlePayment }) => {
  return (
    <div className="p-6 has-border rounded-sm border-2 border-[#c89979] py-4 px-8">
      <h2 className="text-[1.1em] overflow-hidden pt-2 pb-4 font-bold uppercase text-[#1c1c1c]">Đơn Hàng Của Bạn</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-2 border-b-[3px] border-[#ececec] pb-2">
          <span className='text-left leading-[1.3] text-[.9em] font-bold text-[#1c1c1c] uppercase'>Sản phẩm</span>
          <span className='text-left leading-[1.3] text-[.9em] font-bold text-[#1c1c1c] uppercase'>Tổng</span>
        </div>
        {cartItems.map(item => (
          <div className="flex justify-between mb-2 border-b border-[#ececec] py-[.5em]" key={item.cart_id}>
            <span className='leading-[1.3] text-[.9em] text-sm text-[#666]'>{item.products.product_name} <span className='font-bold'>× {item.quantity}</span></span>
            <span className='inline text-[14.4px] font-bold leading-[18.72px] text-[#111]'>{(item.products.price * item.quantity).toLocaleString()} ₫</span>
          </div>
        ))}
        <div className="flex justify-between mb-2 py border-b border-[#ececec] py-[.5em]">
          <span className='text-[13.6px] font-bold leading-[14.28px] text-[#353535]'>Tổng phụ</span>
          <span className='inline text-[14.4px] font-bold leading-[18.72px] text-[#111]'>{subtotal.toLocaleString()} ₫</span>
        </div>
        <div className="flex justify-between mb-2 py-[.5em]">
          <span className='text-[13.6px] font-bold leading-[14.28px] text-[#666]'>Giao hàng</span>
          <span className="font-['Roboto'] text-[12.96px] leading-[16.848px] text-[#222]">Giao hàng miễn phí</span>
        </div>
        <div className="flex justify-between font-bold py-[.5em] pt-2 border-t border-b-[3px] border-[#ececec]">
          <span className='text-[13.6px] font-bold leading-[14.28px] text-[#353535]'>Tổng</span>
          <span className='inline text-[14.4px] font-bold leading-[18.72px] text-[#111]'>{subtotal.toLocaleString()} ₫</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={formData.paymentMethod === 'COD'}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="absolute left-0 top-0 mt-1"
            />
            <label htmlFor="cod" className="ml-8 block cursor-pointer font-roboto text-[14.4px] font-bold leading-[23.04px] text-[#222]">
              Trả tiền mặt khi nhận hàng
            </label>
            {formData.paymentMethod === 'COD' && (
              <div className="p-2 transition duration-300 ease-in-out font-roboto text-[14.4px] leading-[23.04px] text-[#353535]">
                Trả tiền mặt khi giao hàng.
              </div>
            )}
          </div>
          <div className="border-t border-[#ececec]"></div>
          <div className="relative">
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="Bank Transfer"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="absolute left-0 top-0 mt-1"
            />
            <label htmlFor="bankTransfer" className="ml-8 block cursor-pointer font-roboto text-[14.4px] font-bold leading-[23.04px] text-[#222]">
              Chuyển khoản ngân hàng
            </label>
            {formData.paymentMethod === 'Bank Transfer' && (
              <div className=" p-2 transition duration-300 ease-in-out font-roboto text-[14.4px] leading-[23.04px] text-[#353535]">
                Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã chuyển.
              </div>
            )}
          </div>
        </div>
      </div>
      <button onClick={handlePayment} className="w-full py-2 bg-[#d26e4b] text-white font-bold rounded-sm mb-4">ĐẶT HÀNG</button>
    </div>
  );
};

export default OrderSummary;
