import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { Card } from 'antd';
import { ProductService } from '../../../services/productService';
import { BASE_URL_IMG } from '../../../services/config';
const { Meta } = Card;
export default function ProductTab() {
    const onChange = (key) => {
        console.log(key);
    };
    const [popularProduct, setPopularProduct] = useState([])
    const [promotionProduct, setpromotionProduct] = useState([])
    const [newProduct, setNewProduct] = useState([])
    useEffect(() => { 
      ProductService.getPopularPrd().then((res) => { 
        setPopularProduct(res.data)
      }).catch(err => console.log(err))

      ProductService.getTopPromotion().then((res) => { 
        setpromotionProduct(res.data)
      }).catch(err => console.log(err))

      ProductService.getNew().then((res) => { 
        setNewProduct(res.data)
      }).catch(err => console.log(err))

    }, [])
    const items = [
        {
          key: '1',
          label: 'Sản phẩm phổ biến',
          children: (
              <div className="grid grid-cols-5 gap-4 items-center">
                    {popularProduct?.map((product) => (
                    <ProductCard product={product} />
                ))}
                </div>
          ),
        },
        {
          key: '2',
          label: 'Sản phẩm khuyến mãi',
          children: (
            <div className="grid grid-cols-5 gap-4 items-center">
                    {promotionProduct?.map((product) => (
                    <ProductCard product={product} />
                ))}
                </div>
          ),
        },
        {
          key: '3',
          label: 'Sản phẩm mới',
          children: (
            <div className="grid grid-cols-5 gap-4 items-center">
                    {newProduct?.map((product) => (
                    <ProductCard product={product} />
                ))}
                </div>
          ),
        },
      ];
  return (
    <div className='container pb-24'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
