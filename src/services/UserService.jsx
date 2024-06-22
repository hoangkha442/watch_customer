// services/UserService.js
import { https } from './config';

export const UserServices = {
  login: async (data) => {
    return await https.post(`/auth/login`, data);
  },
  getProfile: async () => {
    return await https.get(`/user/get-info`);
  },

  // CART service
  addToCart: async (data) => {
    return await https.post(`/cart`, data);
  },
  getCartByUserId: async () => {
      return await https.get(`/cart/user`)
  },
  putCartQuantity: async (cartId, quantity) => {
    return await https.put(`/cart/${cartId}`, quantity);
  },
  updateMultipleCartItems: async (items) => {
    return await https.put(`/cart/update-multiple`, { items });
  },
  deleteMultipleCartItems: async (items) => {
    return await https.delete(`/cart/delete-multiple`, { data: { items } });
  },


  // ORDER
  createMultipleOrders: async (orders) => {
    return await https.post(`/order/create-multiple`, orders);
  },
};
