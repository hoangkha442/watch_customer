import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux
import Swal from 'sweetalert2'; // Import Swal
import { FaHeart } from 'react-icons/fa';
import Modal from 'react-modal';

// Import images
import logoGHN from '../../asset/img/logo-ghn.jpg';
import logoGHTK from '../../asset/img/logo-ghtk.jpg';
import logoNinjaVan from '../../asset/img/logo-ninja-van.jpg';
import logoShipChung from '../../asset/img/logo-shipchung.jpg';
import logoViettelPost from '../../asset/img/logo-viettle-post.jpg';
import logoVNPost from '../../asset/img/logo-vn-post.jpg';
import logoACB from '../../asset/img/logo-acb.jpg';
import logoTechcombank from '../../asset/img/logo-techcombank.jpg';
import logoVIB from '../../asset/img/logo-vib.jpg';
import logoVCB from '../../asset/img/logo-vcb.jpg';
import logoPayPal from '../../asset/img/logo-paypal.jpg';
import logoMasterCard from '../../asset/img/logo-mastercard.jpg';
import { addToCart } from '../../redux/CartSlice';

Modal.setAppElement('#root');

const ProductInfo = ({ productDetail, quantity, increment, decrement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const dispatch = useDispatch(); // Initialize useDispatch
  const user = useSelector(state => state.user.userInfo); // Get user info from Redux state

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        title: 'Cảnh báo!',
        text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.',
        icon: 'warning',
        confirmButtonText: 'Đóng'
      });
      return;
    }

    dispatch(addToCart({ product_id: productDetail.product_id, quantity }))
      .unwrap() // Handle the fulfilled or rejected action
      .then(() => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Thêm sản phẩm vào giỏ hàng thành công!',
          icon: 'success',
          confirmButtonText: 'Đóng'
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Lỗi!',
          text: error.message || 'Thêm sản phẩm vào giỏ hàng thất bại.',
          icon: 'error',
          confirmButtonText: 'Đóng'
        });
      });
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  return (
    <div className="md:pl-10 mt-6 md:mt-0 w-full space-y-6">
      <div>
        <div className="flex items-center text-sm uppercase text-gray-700">
          <p className='opacity-70'>Trang chủ</p>
          <p className='mx-3'>/</p>
          <p className='opacity-70 uppercase'>{productDetail?.product_categories?.category_name}</p>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 pt-2 md:mt-0 uppercase">{productDetail?.product_name}</h2>
        <div className="h-[3px] bg-gray-200 my-4 w-full max-w-[30px]"></div>
      </div>
      <div className="flex text-gray-600 text-2xl gap-2 mt-0">
        {productDetail?.promotion_percentage > 0 && (
          <p className="line-through decoration-gray-500">{productDetail?.price.toLocaleString()} ₫</p>
        )}
        <p className="font-bold text-[#c89979]">
          {(productDetail?.price - (productDetail?.price * productDetail?.promotion_percentage / 100)).toLocaleString()} ₫
        </p>
      </div>
      <p className="mt-4 text-gray-700">{productDetail?.description}</p>

      <ul className='list-disc pl-5 text-gray-800'>
        <li className='mt-3'><span className="font-semibold">Thương hiệu:</span> {productDetail?.suppliers?.supplier_name}</li>
        <li className='mt-3'><span className="font-semibold">Danh mục:</span> {productDetail?.product_categories?.category_name}</li>
        <li className='mt-3'><span className="font-semibold">Tình trạng:</span> {productDetail?.quantity_in_stock > 0 ? 'Còn hàng' : 'Hết hàng'}</li>
        <li className='mt-3'><span className="font-semibold">Mã sản phẩm:</span> {productDetail?.product_id}</li>
      </ul>

      <div className="flex items-center mt-5">
        <button
          className="bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-2"
          onClick={decrement}
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="text-center w-10 border border-gray-300 py-2"
        />
        <button
          className="bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-2"
          onClick={increment}
        >
          +
        </button>
        <button
          className="bg-[#d26e4b] text-white px-6 py-2 rounded-sm hover:bg-orange-500 ml-4"
          onClick={handleAddToCart} // Call the handleAddToCart function
        >
          THÊM VÀO GIỎ
        </button>
      </div>

      {/* Phần hiển thị logo vận chuyển và thanh toán */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex flex-wrap justify-between">
          {/* Cột cho tính phí ship tự động */}
          <div className="w-full md:w-1/2 space-y-2">
            <p className="text-lg font-semibold">Tính phí ship tự động:</p>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 items-center">
              <img src={logoGHN} alt="GHN" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoGHN)} />
              <img src={logoGHTK} alt="GHTK" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoGHTK)} />
              <img src={logoNinjaVan} alt="Ninja Van" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoNinjaVan)} />
              <img src={logoShipChung} alt="Ship Chung" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoShipChung)} />
              <img src={logoViettelPost} alt="Viettel Post" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoViettelPost)} />
              <img src={logoVNPost} alt="VN Post" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoVNPost)} />
            </div>
          </div>

          {/* Cột cho thanh toán */}
          <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0">
            <p className="text-lg font-semibold">Thanh toán:</p>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 items-center">
              <img src={logoACB} alt="ACB" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoACB)} />
              <img src={logoTechcombank} alt="Techcombank" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoTechcombank)} />
              <img src={logoVIB} alt="VIB" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoVIB)} />
              <img src={logoVCB} alt="VCB" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoVCB)} />
              <img src={logoPayPal} alt="PayPal" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoPayPal)} />
              <img src={logoMasterCard} alt="MasterCard" className="w-[91px] h-[45px] object-contain cursor-pointer" onClick={() => openModal(logoMasterCard)} />
            </div>
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
        <div className="relative w-full h-full flex items-center justify-center">
          <button 
            className="absolute top-2 right-2 text-white text-2xl z-10"
            onClick={closeModal}
          >
            &times;
          </button>
          <img 
            src={modalImage}
            alt="Modal"
            className="object-contain max-w-full max-h-[90vh] mx-auto"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductInfo;
