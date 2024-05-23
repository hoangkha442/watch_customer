import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classico 3',
      image: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04-300x300.png',
      price: 700000,
      quantity: 1
    },
    {
      id: 2,
      name: 'Classico 4',
      image: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04-300x300.png',
      price: 800000,
      quantity: 1
    }
  ]);
  const [subtotal, setSubtotal] = useState(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
  const [cartUpdated, setCartUpdated] = useState(false);
  const [originalCartItems, setOriginalCartItems] = useState([...cartItems]);

  useEffect(() => {
    setOriginalCartItems([...cartItems]);
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleUpdateCart = () => {
    if (JSON.stringify(cartItems) !== JSON.stringify(originalCartItems)) {
      setSubtotal(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
      setCartUpdated(true);
      setOriginalCartItems([...cartItems]);

      // Hide the update message after a few seconds
      setTimeout(() => {
        setCartUpdated(false);
      }, 3000); // Message will disappear after 3 seconds
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Giỏ Hàng</h1>
      {cartUpdated && (
        <div className="mb-4 text-green-600">
          <span>Giỏ hàng đã được cập nhật.</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <div className="border-b-2 pb-2 mb-4 grid grid-cols-4 gap-4">
            <div>SẢN PHẨM</div>
            <div>GIÁ</div>
            <div>SỐ LƯỢNG</div>
            <div>TỔNG</div>
          </div>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} />
          ))}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border-[1.6px] border-[#c89979] text-[#c89979] font-medium text-sm"><span className='mr-3'>←</span> TIẾP TỤC XEM SẢN PHẨM</button>
            <button onClick={handleUpdateCart} className="px-4 py-2 bg-gray-300 text-gray-700">CẬP NHẬT GIỎ HÀNG</button>
          </div>
        </div>
        <div className="md:col-span-2">
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
