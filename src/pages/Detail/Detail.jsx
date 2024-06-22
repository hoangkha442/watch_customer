import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ProductService } from '../../services/productService';
import { FaHeart, FaExpandAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BASE_URL_IMG } from "../../services/config";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Thiết lập gốc của ứng dụng cho modal

const Detail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { 
    if (id) {
      ProductService.getProductId(id).then((response) => {
        const product = response.data[0];
        setProductDetail(product);
        // Đặt ảnh chính là ảnh đầu tiên
        if (product.product_images.length > 0) {
          setMainImageIndex(0);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [id]);
  
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const openModal = (index) => {
    setMainImageIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    if (productDetail) {
      setMainImageIndex((prevIndex) => (prevIndex + 1) % productDetail.product_images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (productDetail) {
      setMainImageIndex((prevIndex) => (prevIndex - 1 + productDetail.product_images.length) % productDetail.product_images.length);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row space-x-5">
        <div className="md:w-1/2 relative">
          <div 
            className="mb-4 cursor-pointer relative overflow-hidden group" 
            onClick={() => openModal(mainImageIndex)}
          >
            {productDetail?.product_images[mainImageIndex] ? (
              <img 
                src={`${BASE_URL_IMG}${productDetail.product_images[mainImageIndex].image_url}`} 
                alt={productDetail?.product_name} 
                className="object-contain w-full rounded-lg h-[480px] shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <img src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png" alt="Classico 3 Watch" className="object-cover w-full rounded-lg shadow-md" />
            )}
            <button 
              className="absolute top-2 right-2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200"
              onClick={(e) => { e.stopPropagation(); openModal(mainImageIndex); }}
            >
              <FaExpandAlt />
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => { e.stopPropagation(); prevImage(e); }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => { e.stopPropagation(); nextImage(e); }}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="thumbnails flex gap-4 justify-center">
            {productDetail?.product_images?.map((image, index) => (
              <img 
                key={index}
                src={`${BASE_URL_IMG}${image.image_url}`}
                alt={`${productDetail?.product_name} - ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border rounded-lg transition-transform duration-300 ${mainImageIndex === index ? 'border-gray-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <div className="flex items-center text-sm uppercase text-gray-700">
            <p className='opacity-70'>Trang chủ</p>
            <p className='mx-3'>/</p>
            <p className='opacity-70 uppercase'>{productDetail?.product_categories?.category_name}</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 pt-2 md:mt-0 uppercase">{productDetail?.product_name}</h2>
          <div className="h-[3px] bg-gray-200 my-4 w-full max-w-[30px]"></div>
          
          <div className="flex text-gray-600 text-2xl gap-4">
            {productDetail?.promotion_percentage > 0 && (
              <p className="line-through decoration-gray-500">{productDetail?.price.toLocaleString()} ₫</p>
            )}
            <p className="font-bold text-[#c89979]">
              {(productDetail?.price - (productDetail?.price * productDetail?.promotion_percentage / 100)).toLocaleString()} ₫
            </p>
          </div>
          <p className="mt-4 text-gray-700">
            {productDetail?.description}
          </p>
          <ul className='list-disc pl-5 text-gray-800'>
            <li className='mt-6'>Thương hiệu: {productDetail?.suppliers?.supplier_name}</li>
            <li className='py-2'>Danh mục: {productDetail?.product_categories?.category_name}</li>
            <li>Còn: {productDetail?.quantity_in_stock} sản phẩm</li>
          </ul>
          <div className="flex items-center mt-5">
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg"
              onClick={decrement}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="text-center w-12 border border-gray-300 py-1 mx-2 rounded-lg"
            />
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg"
              onClick={increment}
            >
              +
            </button>
            <button
              className="bg-[#c89979] text-white px-6 py-2 rounded-lg hover:bg-[#ab8268] transition-all duration-300 ml-4"
            >
              THÊM VÀO GIỎ
            </button>
            <button className="heart-icon ml-2">
              <FaHeart className='text-[#d26e4b]'/>
            </button>
          </div>
        </div>
      </div>

      {/* Modal cho ảnh toàn màn hình */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }, content: { border: 'none', background: 'none', overflow: 'visible' } }}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center group">
          <button 
            className="absolute top-2 right-2 text-white text-2xl z-10"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>
          <img 
            src={`${BASE_URL_IMG}${productDetail?.product_images[mainImageIndex]?.image_url}`}
            alt={productDetail?.product_name}
            className="object-contain max-w-full max-h-[90vh] mx-auto"
          />
          <button
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Detail;
