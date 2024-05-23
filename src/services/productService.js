import { https } from "./config";

export const ProductService = {
    getTopSelling: async () => {
      return await https.get(`/product/top-selling`);
    },
    getPopularPrd: async () => {
      return await https.get(`/product/popular`)
    },
    getTopPromotion: async () => {
      return await https.get(`/product/top-promotions`)
    },
    getNew: async () => {
      return await https.get(`/product/new-products`)
    },
}