// services/UserService.js
import { https } from './config';

export const UserServices = {
  login: async (data) => {
    return await https.post(`/auth/login`, data);
  },
  getProfile: async () => {
    return await https.get(`/user/my-info`);
  },
};
