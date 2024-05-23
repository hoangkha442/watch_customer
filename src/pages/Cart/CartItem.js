import React from 'react';

const CartItem = ({ item, onQuantityChange }) => {
  const handleQuantityChange = (increment) => {
    const newQuantity = item.quantity + increment;
    if (newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b py-4 items-center">
      <div className="flex items-center justify-between">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
        <h2 className="font-medium text-base">{item.name}</h2>
      </div>
      <div className="ml-4 flex-grow">
        <p className="text-gray-600">{item.price.toLocaleString()} ₫</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 border">-</button>
        <span className="px-4 py-1 border-y">{item.quantity}</span>
        <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 border">+</button>
      </div>
      <div className="ml-4 w-24 text-right">
        <span className="font-bold">{(item.price * item.quantity).toLocaleString()} ₫</span>
      </div>
    </div>
  );
};

export default CartItem;
