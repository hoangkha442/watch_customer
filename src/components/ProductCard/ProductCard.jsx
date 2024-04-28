export const ProductCard = ({ product }) => {
    return (
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        {product.discount && (
          <span className="absolute top-0 left-0 bg-orange-200 text-orange-800 text-sm px-2 py-1 rounded-br-lg">
            {product.discount}%
          </span>
        )}
        <img className="object-cover w-[300px] h-[300px]" src={product.imageUrl} alt={product.name} />
        <div className="p-5">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
          <div className="flex items-baseline">
            <p className="text-gray-600 text-sm line-through">{product.originalPrice}</p>
            <p className="text-gray-900 text-lg ml-2">{product.price}</p>
          </div>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            THÊM VÀO GIỎ
          </button>
        </div>
      </div>
    );
  };