import React from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from '../MenWatch/Dropdown/Dropdown';
import Category from '../MenWatch/Category/Category';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import GetMoreInfo from '../HomePage/GetMoreInfo/GetMoreInfo';

export default function WomenWatch() {
  const sortingOptions = ['Thứ tự mặc định', 'Thứ tự theo mức độ phổ biến', 'Thứ tự theo điểm đánh giá'];
  const navigate = useNavigate()
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
    <div className='container pt-16'>
        <div className="flex justify-between pb-10">
        <div className="flex items-center space-x-4">
            <p onClick={() => { navigate('/') }} className='text-[#111] text-lg opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer'>TRANG CHỦ</p>
            <span className='text-[#111] text-lg opacity-60'>/</span>
            <p className='text-[#111] text-lg font-bold uppercase'>ĐỒNG HỒ NỮ</p>
        </div>
        <div className="flex items-center space-x-2">
        <span className='text-[#333]'>Hiển thị một kết quả duy nhất</span>
        <Dropdown
            options={sortingOptions}
        />
        </div>
        </div>

        <div className="flex space-x-8 pb-16">
            <Category />
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    products.map((product) => { 
                        return (
                            <ProductCard product={product}/>
                        )
                     })
                }
                </div>
            </>
        </div>

        <GetMoreInfo />
    </div>
  )
}
