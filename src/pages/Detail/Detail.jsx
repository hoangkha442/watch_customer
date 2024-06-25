import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ProductService } from '../../services/productService';
import { UserServices } from '../../services/UserService';
import Swal from 'sweetalert2'; // Import Swal
import Modal from 'react-modal';
import MainImage from './MainImage';
import Thumbnails from './Thumbnails';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BASE_URL_IMG } from '../../services/config';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../../redux/CartSlice';

Modal.setAppElement('#root');

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const cartStatus = useSelector(state => state.cart.status); 
  const cartError = useSelector(state => state.cart.error); 

  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('related');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      ProductService.getProductId(id)
        .then((response) => {
          const product = response.data[0];
          setProductDetail(product);
          if (product.product_images.length > 0) {
            setMainImageIndex(0);
          }
          fetchRelatedProducts(product.product_id);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  useEffect(() => {
    // Fetch cart items when the component mounts or cart state changes
    dispatch(fetchCart());
  }, [dispatch]); 
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

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const fetchRelatedProducts = async (productId) => {
    try {
      const response = await ProductService.getRelatedProduct(productId);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      Swal.fire({
        title: 'Cảnh báo!',
        text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.',
        icon: 'warning',
        confirmButtonText: 'Đóng'
      });
      return;
    }

    dispatch(addToCart({ product_id: product.product_id, quantity }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Thêm sản phẩm vào giỏ hàng thành công!',
          icon: 'success',
          confirmButtonText: 'Đóng'
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        Swal.fire({
          title: 'Lỗi!',
          text: error.message || 'Thêm sản phẩm vào giỏ hàng thất bại.',
          icon: 'error',
          confirmButtonText: 'Đóng'
        });
      });
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row space-x-5">
        <div className="md:w-1/2 relative">
          {productDetail && (
            <>
              <MainImage
                productDetail={productDetail}
                mainImageIndex={mainImageIndex}
                openModal={openModal}
                prevImage={prevImage}
                nextImage={nextImage}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
              <Thumbnails
                productDetail={productDetail}
                mainImageIndex={mainImageIndex}
                setMainImageIndex={setMainImageIndex}
              />
            </>
          )}
        </div>
        <div className="md:w-1/2">
          {productDetail && (
            <ProductInfo
              productDetail={productDetail}
              quantity={quantity}
              increment={increment}
              decrement={decrement}
            />
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-8">
        <div className="flex space-x-2 border-b border-[#ddd]">
          <TabButton label="CÁC SẢN PHẨM LIÊN QUAN" activeTab={activeTab} tabKey="related" setActiveTab={setActiveTab} />
          <TabButton label="ĐÁNH GIÁ" activeTab={activeTab} tabKey="review-form" setActiveTab={setActiveTab} />
          <TabButton label="ĐÁNH GIÁ CỦA MỌI NGƯỜI" activeTab={activeTab} tabKey="reviews" setActiveTab={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className='border-x border-b border-[#ddd] p-4'>
          {activeTab === 'related' && <RelatedProducts relatedProducts={relatedProducts} handleAddToCart={handleAddToCart} />}
          {activeTab === 'review-form' && <ProductReviews productDetail={productDetail} onlyForm setActiveTab={setActiveTab} />}
          {activeTab === 'reviews' && <ProductReviews productDetail={productDetail} onlyList setActiveTab={setActiveTab} />}
        </div>
      </div>

      {/* Modal cho ảnh toàn màn hình */}
      {productDetail && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }, content: { border: 'none', background: 'none', overflow: 'visible' } }}
        >
          <div className="relative w-full h-full flex items-center justify-center group">
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
              src={`${BASE_URL_IMG}${productDetail.product_images[mainImageIndex]?.image_url}`}
              alt={productDetail.product_name}
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
      )}
    </div>
  );
};

// Component cho nút điều hướng tab
const TabButton = ({ label, activeTab, tabKey, setActiveTab }) => (
  <button 
    className={`py-3 px-3 font-medium text-sm transition-all duration-500 ${activeTab === tabKey ? 'border-t-[#d26e4b] text-[#d26e4b] border-t-2 border-x border-[#ddd]' : 'text-[#666666] hover:text-gray-700 hover:border-gray-300 bg-[#f5f5f5] border-x border-t border-[#ddd]'}`}
    onClick={() => setActiveTab(tabKey)}
  >
    {label}
  </button>
);

// Component cho mô tả sản phẩm
const Description = ({ productDetail }) => (
  <div>
    <p>{productDetail?.description}</p>
  </div>
);

// Component cho các sản phẩm liên quan
const RelatedProducts = ({ relatedProducts, handleAddToCart }) => (
  <div className="p-6">
    <div className='p-6 border-[2px] border-[#c89979]'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {relatedProducts.length === 0 ? (
          <p className="text-gray-700">Chưa có sản phẩm liên quan.</p>
        ) : (
          relatedProducts.map(product => (
            <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
          ))
        )}
      </div>
    </div>
  </div>
);

export default Detail;
