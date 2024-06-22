import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/CartSlice';
import { UserServices } from '../../services/UserService';
import Swal from 'sweetalert2';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [localCartItems, setLocalCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    setLocalCartItems(cartItems);
    const newSubtotal = cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleQuantityChange = (cartId, newQuantity) => {
    const updatedCartItems = localCartItems.map(item =>
      item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
    );
    setLocalCartItems(updatedCartItems);
    const newSubtotal = updatedCartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  };

  const handleDeleteItem = async (cartId) => {
    await UserServices.deleteMultipleCartItems([{ cart_id: cartId }]);
    dispatch(fetchCart());
  };

  const handleUpdateCart = async () => {
    const updateItems = localCartItems.map(item => ({
      cart_id: item.cart_id,
      quantity: item.quantity,
    }));

    await UserServices.updateMultipleCartItems(updateItems);
    dispatch(fetchCart());
    setCartUpdated(true);
    setTimeout(() => {
      setCartUpdated(false);
    }, 3000);
  };

  const handleDeleteMultipleCartItems = async () => {
    const deleteItems = localCartItems.map(item => ({
      cart_id: item.cart_id,
    }));

    await UserServices.deleteMultipleCartItems(deleteItems);
    dispatch(fetchCart());
  };

  const handleCheckout = async () => {
    const orders = localCartItems.map(item => ({
      company_id: item.company_id || 1, // Update company_id appropriately
      order_date: new Date().toISOString(),
      status: 'pending',
      total_amount: item.products.price * item.quantity,
      details: [
        {
          product_id: item.product_id * 1,
          quantity: item.quantity,
          price: item.products.price,
        }
      ],
      paymentDetail: {
        amount: item.products.price * item.quantity,
        payment_method: 'COD',
        payment_status: 'pending',
      },
      shippingDetail: {
        shipping_address: 'Sample Shipping Address',
        estimated_delivery_date: new Date().toISOString(),
      }
    }));

    const orderData = { orders }; // Ensure orders is an array

    try {
      await UserServices.createMultipleOrders(orderData);
      dispatch(fetchCart());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đặt hàng thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      const deleteItems = localCartItems.map(item => ({
        cart_id: item.cart_id,
      }));
      await UserServices.deleteMultipleCartItems(deleteItems);
      dispatch(fetchCart());
      // Handle successful checkout, e.g., show success message or redirect
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle error, e.g., show error message
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
          <div className="border-b-2 pb-2 mb-4 grid grid-cols-5 gap-4">
            <div></div> {/* Empty header for delete button column */}
            <div>SẢN PHẨM</div>
            <div>GIÁ</div>
            <div>SỐ LƯỢNG</div>
            <div>TỔNG</div>
          </div>
          {localCartItems.map(item => (
            <CartItem key={item.cart_id} item={item} onQuantityChange={handleQuantityChange} onDelete={handleDeleteItem} />
          ))}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border-[1.6px] border-[#c89979] text-[#c89979] font-medium text-sm">
              <span className='mr-3'>←</span> TIẾP TỤC XEM SẢN PHẨM
            </button>
            <button onClick={handleUpdateCart} className="px-4 py-2 bg-gray-300 text-gray-700">CẬP NHẬT GIỎ HÀNG</button>
            <button onClick={handleDeleteMultipleCartItems} className="px-4 py-2 bg-red-500 text-white">XÓA TẤT CẢ</button>
            {/* <button onClick={handleCheckout} className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg mb-4">TIẾN HÀNH THANH TOÁN</button> */}
          </div>
        </div>
        <div className="md:col-span-2">
          <CartSummary subtotal={subtotal} handleCheckout={handleCheckout}/>
        </div>
      </div>
    </div>
  );
};

export default Cart;
