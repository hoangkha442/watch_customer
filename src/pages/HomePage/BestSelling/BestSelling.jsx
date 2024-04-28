import React from 'react'
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { Card } from 'antd';
const { Meta } = Card;
export default function BestSelling() {
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
      ];
  return (
    <div className="container">
        <h3 className='text-3xl font-bold mb-5'>Sản phẩm bán chạy</h3>
        <div className="flex justify-around items-center space-x-4">
            {products.map((product) => (
                <Card
                className='shadow-xl overflow-hidden'
                hoverable
                style={{
                  width: 280,
                }}
                cover={<img className='hover:scale-110 transition duration-500 cursor-pointer object-cover h-70' alt="example" src={product.imageUrl} />}
              >
                <Meta className='text-center' title={product.name} description={product.price} />
                <div className="text-center mt-2">
                    <button className='bg-[#c89979] py-2 px-6 border border-[#0000000d] text-white text-[12px] font-bold'>Thêm vào giỏ</button>
                </div>
              </Card>
            ))}
        </div>
        
    </div>
  )
}
