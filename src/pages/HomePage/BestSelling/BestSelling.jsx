import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'antd';
import { ProductService } from '../../../services/productService';
import { BASE_URL_IMG } from '../../../services/config';

const { Meta } = Card;

export default function BestSelling() {
  const [topProducts, setTopProducts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => { 
    ProductService.getTopSelling().then((res) => { 
      setTopProducts(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto px-4">
        <h3 className='text-3xl font-bold mb-5'>Sản phẩm bán chạy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 items-center">
            {topProducts.length > 0 ? topProducts.map((product, index) => (
                <Card
                  key={index}
                  className='shadow-xl overflow-hidden'
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img className='hover:scale-110 transition duration-500 cursor-pointer object-cover h-72' onClick={() => { 
                    navigate(`san-pham/${product?.product_id}`)
                   }} alt="product" src={BASE_URL_IMG + product.product_picture} />}
                >
                  <Meta className='text-center' title={product.product_name} description={`$${product.price}`} />
                  <div className="text-center mt-2">
                    <button className='bg-[#c89979] hover:bg-[#ab8164] transition-all duration-300 py-2 px-6 border border-[#0000000d] text-white text-[12px] font-bold'>Thêm vào giỏ</button>
                  </div>
                </Card>
            )) : <p>Loading products...</p>}
        </div>
    </div>
  );
}
