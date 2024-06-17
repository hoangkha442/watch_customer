import React from 'react';
import { BASE_URL_IMG } from '../../services/config';

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (increment) => {
    const newQuantity = item.quantity + increment;
    if (newQuantity > 0) {
      onQuantityChange(item.cart_id, newQuantity);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b py-4 items-center">

      <div className="flex items-center">
        <button onClick={() => onDelete(item.cart_id)} className="text-red-500 mr-5">X</button>
        <img src={`${BASE_URL_IMG}${item.products.product_picture}`} alt={item.products.product_name} className="w-20 h-20 object-cover" />
      </div>
      <div>
        <h2 className="font-medium text-base ml-1">{item.products.product_name}</h2>


      </div>
      <div className="ml-4 flex-grow">
        <p className="text-gray-600">{item.products.price.toLocaleString()} ₫</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 border">-</button>
        <span className="px-4 py-1 border-y">{item.quantity}</span>
        <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 border">+</button>
      </div>
      <div className="ml-4 w-24 text-right">
        <span className="font-bold">{(item.products.price * item.quantity).toLocaleString()} ₫</span>
      </div>
    </div>
  );
};

export default CartItem;
