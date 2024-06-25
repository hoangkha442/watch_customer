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
    getProduct: async () => {
      return await https.get(`/product`)
    },
    getSearchProduct: async (productName) => {
      return await https.get(`/product/search/${productName}`)
    },
    getProductId: async (productId) => {
      return await https.get(`/product/get-product/${productId}`)
    },
    getRelatedProduct: async (productId) => {
      return await https.get(`/product/related-products/${productId}`)
    },
    getProductImageByProductId: async (productId) => {
      return await https.get(`/product-images/product/${productId}`)
    },
}