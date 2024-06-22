import React from 'react';
import { FaExpandAlt, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { BASE_URL_IMG } from "../../services/config";

const MainImage = ({ productDetail, mainImageIndex, openModal, prevImage, nextImage, toggleFavorite, isFavorite }) => (
  <div className="relative">
    <div 
      className="cursor-pointer relative overflow-hidden group"
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
        className="absolute top-2 right-2 text-gray-800 p-2 rounded-full shadow-md bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-200"
        onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
      >
        <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-800'} />
      </button>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => { e.stopPropagation(); prevImage(e); }}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => { e.stopPropagation(); nextImage(e); }}
      >
        <FaChevronRight />
      </button>
      <button 
        className="absolute bottom-2 left-2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 opacity-0 group-hover:opacity-100"
        onClick={(e) => { e.stopPropagation(); openModal(mainImageIndex); }}
      >
        <FaExpandAlt />
      </button>
    </div>
  </div>
);  

export default MainImage;
