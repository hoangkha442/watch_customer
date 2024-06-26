// services/UserService.js
import { https } from './config';

export const UserServices = {
  login: async (data) => {
    return await https.post(`/auth/login`, data);
  },
  signup: async (data) => {
    return await https.post(`/auth/signup`, data);
  },
  sendResetPasswordEmail: async (data) => {
    return await https.post(`/auth/send-reset-password-email`, data);
  },
  resetPassword: async (data) => {
    return await https.post(`/auth/reset-password`, data);
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
  getOrder: () => https.get(`/order/user`),
  putStatusOrder: (id, data) => https.put(`/order/${id}/status`, data),


  getOrderDetail: () => https.get(`/order-detail`),

  // Review services
  createReview: async (data) => {
    return await https.post(`/review`, data);
  },
  getReviewsByProductId: async (productId) => {
    return await https.get(`/review/product/${productId}`);
  },
  updateReview: async (reviewId, data) => {
    return await https.put(`/review/${reviewId}`, data);
  },
  deleteReview: async (reviewId) => {
    return await https.delete(`/review/${reviewId}`);
  },

  // Shipping
  getShipping: () => https.get(`/shipping-details`),
};
