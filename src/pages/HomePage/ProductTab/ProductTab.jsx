import React from 'react'
import { Tabs } from 'antd';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { Card } from 'antd';
const { Meta } = Card;
export default function ProductTab() {
    const onChange = (key) => {
        console.log(key);
    };
    const products = [
        {
          id: 1,
          name: 'Classico 4',
          imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png',
          originalPrice: '700,000 đ',
          price: '500,000 đ',
          discount: '-29',
        },
        {
            id: 2,
            name: 'Classico 3',
            imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png',
            originalPrice: '700,000 đ',
            price: '500,000 đ',
            discount: '-29',
          },
          {
            id: 3,
            name: 'Classico 2',
            imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-03.png',
            originalPrice: '700,000 đ',
            price: '500,000 đ',
            discount: '-29',
          },
          {
            id: 4,
            name: 'Classico 1',
            imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-02.png',
            originalPrice: '700,000 đ',
            price: '500,000 đ',
            discount: '-29',
          },
          {
            id: 5,
            name: 'Classico 1',
            imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png',
            originalPrice: '700,000 đ',
            price: '500,000 đ',
            discount: '-29',
          },
    ];
    const items = [
        {
          key: '1',
          label: 'Sản phẩm phổ biến',
          children: (
              <div className="grid grid-cols-5 gap-4 items-center">
                    {products.map((product) => (
                <Card
                className='shadow-xl overflow-hidden'
                hoverable
                style={{
                  width: 220,
                }}
                cover={<img className='hover:scale-110 transition duration-500 cursor-pointer object-cover h-70' alt="example" src={product.imageUrl} />}
              >
                <Meta className='text-center' title={product.name} description={product.price} />
                <div className="text-center mt-2">
                    <button className='bg-[#c89979] py-1 px-4 border hover:bg-[#ab8164] transition-all duration-300 border-[#0000000d] text-white text-[12px] font-bold'>Thêm vào giỏ</button>
                </div>
              </Card>
            ))}
                </div>
          ),
        },
        {
          key: '2',
          label: 'Sản phẩm khuyến mãi',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Sản phẩm mới',
          children: 'Content of Tab Pane 3',
        },
      ];
  return (
    <div className='container pb-24'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
