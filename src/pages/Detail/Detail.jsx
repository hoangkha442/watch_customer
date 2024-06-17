import React, { useState } from 'react';
import { useEffect } from 'react';
import { ProductService } from '../../services/productService';
import { useParams } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
const Detail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState()
  console.log('productDetail: ', productDetail);
  useEffect(() => { 
    if(id){
      ProductService.getProductId(id).then((response) => {
        setProductDetail(response.data[0])
      }).catch((error) => {})
    }
  }, [])
  
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  return (
    <div className="container py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row space-x-5">
        <div className="md:w-1/2">
          <img src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png" alt="Classico 3 Watch" className="object-cover" />
        </div>
        <div className="md:w-1/2 md:pl-10">
            <div className="flex items-center text-sm uppercase text-[#111]">
                <p className='opacity-70'>Trang chủ</p>
                <p className='mx-3'>/</p>
                <p className='opacity-70 uppercase'>{productDetail?.product_categories?.category_name}</p>
            </div>
          <h2 className="text-2xl font-bold text-[#1c1c1c] pt-2 md:mt-0">Classico 3</h2>
          <div class="h-[3px] bg-black/10 my-4 w-full max-w-[30px]"></div>
          
          <div className="flex text-[#c89979] text-2xl gap-4">
            <p className="line-through decoration-[#777]">{productDetail?.price.toLocaleString()}</p>
            <p className="font-bold">{(productDetail?.price - (productDetail?.price * productDetail?.promotion_percentage / 100)).toLocaleString()}</p>
          </div>
          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper.
          </p>
          <ul className='list-disc'>
            <li className='text-gray-800 mt-6'>Thương hiệu: {productDetail?.suppliers?.supplier_name}</li>
            <li className='text-gray-800 py-2'>Danh mục: {productDetail?.product_categories?.category_name}</li>
            <li className='text-gray-800'>Còn: {productDetail?.quantity_in_stock} sản phẩm</li>
          </ul>
          <div className="flex items-center mt-5">
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1"
              onClick={decrement}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="text-center w-10 border border-gray-300 py-1"
            />
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1"
              onClick={increment}
            >
              +
            </button>
            <button
              className="bg-[#d26e4b] text-white px-6 py-2 rounded-sm hover:bg-orange-500 ml-4"
            >
              THÊM VÀO GIỎ
            </button>
      <button className="heart-icon">
        <FaHeart className=''/>
      </button>
          </div>
          <div className="py-5">
    </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
