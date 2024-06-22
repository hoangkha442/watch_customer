import React from 'react';
import { BASE_URL_IMG } from "../../services/config";

const Thumbnails = ({ productDetail, mainImageIndex, setMainImageIndex }) => (
  <div className="thumbnails flex gap-4 justify-center mt-4">
    {productDetail?.product_images?.map((image, index) => (
      <img 
        key={index}
        src={`${BASE_URL_IMG}${image.image_url}`}
        alt={`${productDetail?.product_name} - ${index + 1}`}
        className={`w-28 h-28 object-cover cursor-pointer border rounded-lg transition-transform duration-300 ${mainImageIndex === index ? 'border-gray-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
        onClick={() => setMainImageIndex(index)}
      />
    ))}
  </div>
);

export default Thumbnails;
