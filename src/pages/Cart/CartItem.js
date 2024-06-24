import React from 'react';
import { BASE_URL_IMG } from '../../services/config';

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  console.log('item: ', item);

  const handleQuantityChange = (increment) => {
    const newQuantity = item.quantity + increment;
    if (newQuantity > 0) {
      onQuantityChange(item.cart_id, newQuantity);
    }
  };

  // Lấy URL của hình ảnh đầu tiên từ product_images
  const productImageUrl = item.products.product_images?.[0]?.image_url 
    ? `${BASE_URL_IMG}${item.products.product_images[0].image_url}` 
    : `${BASE_URL_IMG}default-image.png`; // Đường dẫn đến ảnh mặc định nếu không có hình ảnh nào

  return (
    <tr className="border-b">

      <td className="text-start">
        <button 
          onClick={() => onDelete(item.cart_id)} 
          className="text-[#d0d0d0] w-7 h-7 rounded-full border-2 border-[#d0d0d0] hover:text-[#a9a8a8] hover:border-[#a9a8a8] transition-all duration-300">
          X
        </button>
        <img 
          src={productImageUrl} 
          alt={item.products.product_name} 
          className="w-20 h-20 object-cover inline-block" 
        />
        <h2 className="ml-4 inline-block font-normal text-sm">{item.products.product_name}</h2>
      </td>
      <td className="text-start">{item.products.price.toLocaleString()} ₫</td>
      <td className="text-center">
        <div className="inline-flex items-center font-normal text-sm">
          <button onClick={() => handleQuantityChange(-1)} className="p-[6px] border bg-[#efeeee]">-</button>
          <span className="px-2 py-[6px] border-y">{item.quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="p-[6px] border bg-[#efeeee]">+</button>
        </div>
      </td>
      <td className="text-right font-bold">{(item.products.price * item.quantity).toLocaleString()} ₫</td>
    </tr>
  );
};

export default CartItem;
