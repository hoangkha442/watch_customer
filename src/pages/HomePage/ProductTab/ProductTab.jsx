import React, { useEffect, useState } from 'react';
import { Tabs, message } from 'antd';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductService } from '../../../services/productService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/CartSlice';

export default function ProductTab() {
  const dispatch = useDispatch();

  const onChange = (key) => {
    console.log(key);
  };

  const [popularProduct, setPopularProduct] = useState([]);
  const [promotionProduct, setPromotionProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    ProductService.getPopularPrd()
      .then((res) => {
        setPopularProduct(res.data);
      })
      .catch((err) => console.log(err));

    ProductService.getTopPromotion()
      .then((res) => {
        setPromotionProduct(res.data);
      })
      .catch((err) => console.log(err));

    ProductService.getNew()
      .then((res) => {
        setNewProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product_id: product.product_id * 1, quantity: 1 }))
    .then(() => {
        console.log('product_id: product.product_id, quantity: 1 : ', product.product_id );
        message.success('Thêm sản phẩm vào giỏ hàng thành công!');
      })
      .catch((error) => {
        console.error(error);
        message.error(error.message || 'Failed to add product to cart.');
      });
  };

  const items = [
    {
      key: '1',
      label: 'Sản phẩm phổ biến',
      children: (
        <div className="grid grid-cols-5 gap-4 items-center">
          {popularProduct.map((product) => (
            <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Sản phẩm khuyến mãi',
      children: (
        <div className="grid grid-cols-5 gap-4 items-center">
          {promotionProduct.map((product) => (
            <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Sản phẩm mới',
      children: (
        <div className="grid grid-cols-5 gap-4 items-center">
          {newProduct.map((product) => (
            <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className='container pb-24'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
