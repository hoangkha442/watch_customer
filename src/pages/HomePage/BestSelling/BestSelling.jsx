import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, message } from 'antd';
import { ProductService } from '../../../services/productService';
import { BASE_URL_IMG } from '../../../services/config';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/CartSlice';
import { fetchUserProfile } from '../../../redux/UserSlice';
import { ProductCard } from '../../../components/ProductCard/ProductCard';


const { Meta } = Card;

export default function BestSelling() {
  const [topProducts, setTopProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartStatus = useSelector((state) => state.cart.status);


  useEffect(() => {
    ProductService.getTopSelling()
      .then((res) => {
        setTopProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error('Failed to load top-selling products.');
      });
  }, []);

  const handleAddToCart = (product_id) => {
    dispatch(addToCart({ product_id, quantity: 1 }))
      .then(() => {
        message.success('Thêm sản phẩm vào giỏ hàng thành công!');
      })
      .catch((error) => {
        console.error(error);
        message.error(error.message || 'Failed to add product to cart.');
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold mb-5">Sản phẩm bán chạy</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}
