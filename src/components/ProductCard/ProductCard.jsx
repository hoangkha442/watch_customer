import { useNavigate } from "react-router-dom";
import { BASE_URL_IMG } from "../../services/config";

export const ProductCard = ({ product, handleAddToCart }) => {
  console.log('product: ', product);
  const navigate = useNavigate();

  // Kiểm tra nếu có ít nhất một ảnh trong mảng
  const firstImageUrl = product.product_images.length > 0 ? product.product_images[0].image_url : '';

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden relative">
      {product.promotion_percentage != 0 ? (
        <span className="absolute top-0 left-0 bg-orange-200 text-orange-800 text-sm px-2 py-1 rounded-br-lg">
          {product.promotion_percentage}%
        </span>
      ) : ''}
      <div className="overflow-hidden">
        <img
          onClick={() => {
            navigate(`/san-pham/${product.product_id}`);
          }}
          className="object-cover w-full h-[250px] hover:scale-110 transition-all duration-300 cursor-pointer"
          src={BASE_URL_IMG + firstImageUrl}
          alt={product.product_name}
        />
      </div>
      <div className="p-5 pt-1 text-center">
        <h5 className="text-[#3a3a3a] text-base font-bold mb-2">{product.product_name}</h5>
        <div className="flex items-center justify-center text-center">
          <p className="text-[#c89979] text-sm line-through opacity-50">
            {product.promotion_percentage === 0 ? '' : product.price.toLocaleString() + ' ₫'}
          </p>
          <p className="text-[#c89979] font-medium text-[14.5px] ml-2">
            {product.promotion_percentage === 0
              ? `${product.price.toLocaleString()} ₫`
              : `${(product.price - (product.price * product.promotion_percentage / 100)).toLocaleString()} ₫`}
          </p>
        </div>
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-2 bg-[#c89979] text-[12px] font-bold text-white px-4 py-2 hover:bg-[#ab8268] transition-all duration-300"
        >
          THÊM VÀO GIỎ
        </button>
      </div>
    </div>
  );
};
