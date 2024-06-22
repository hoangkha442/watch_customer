import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { UserServices } from '../../services/UserService';
import { BASE_URL_USER_IMG } from '../../services/config';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../../services/LocalService';
import { fetchUserProfile } from '../../redux/UserSlice';

const ProductReviews = ({ productDetail, onlyForm = false, onlyList = false, setActiveTab }) => {
  const user = useSelector(state => state.user.userInfo);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!onlyForm) {
      fetchReviews();
    }
  }, [productDetail.product_id, currentPage]);

  const fetchReviews = async () => {
    try {
      const response = await UserServices.getReviewsByProductId(productDetail.product_id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = userLocalStorage.get()?.token;

    // Kiểm tra nếu người dùng chưa đăng nhập
    if (!user || !token ) {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        text: "Bạn cần đăng nhập để gửi đánh giá. Bạn có muốn đăng nhập không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d26e4b',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Tiếp tục xem'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dang-nhap'); // Điều hướng tới trang đăng nhập
        }
      });
      return;
    }

    // Kiểm tra nếu đánh giá hoặc nhận xét bị trống
    if (rating === 0 || comment.trim() === '') {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng nhập đầy đủ đánh giá và nhận xét!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      await UserServices.createReview({
        product_id: productDetail.product_id,
        rating,
        comment,
        user_id: user.user_id,
      });
      setRating(0);
      setComment('');
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đánh giá thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setActiveTab('reviews'); // Chuyển sang tab đánh giá của mọi người
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Lấy đánh giá hiện tại để hiển thị
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Tính tổng số trang
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="p-6 bg-white mb-8">
      {!onlyList && (
        <div className="p-6 border-[2px] border-[#c89979] mb-4">
          <h3 className="text-lg font-semibold mb-4">Nhập đánh giá của bạn cho sản phẩm "{productDetail.product_name}"</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Đánh giá của bạn</label>
              <div className="flex">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input 
                        type="radio" 
                        name="rating" 
                        value={ratingValue} 
                        onClick={() => setRating(ratingValue)} 
                        className="hidden"
                      />
                      <FaStar 
                        className={`cursor-pointer text-2xl ${ratingValue <= (hover || rating) ? 'text-[#d26e4b]' : 'text-gray-300'}`} 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nhận xét của bạn *</label>
              <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                rows="4" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#c89979]"
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#d26e4b] text-white px-4 py-2 rounded-sm hover:bg-orange-500 transition-all duration-300"
            >
              GỬI ĐI
            </button>
          </form>
        </div>
      )}

      {!onlyForm && (
        <div className='p-6 border-[2px] border-[#c89979]'>
          <div className="text-lg font-semibold mb-4">Đánh giá của mọi người</div>
          {currentReviews.length === 0 ? (
            <p className="text-gray-700">Chưa có đánh giá nào.</p>
          ) : (
            currentReviews.map(review => (
              <div key={review.review_id} className="border-b border-gray-200 mb-4 pb-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((star, index) => (
                    <FaStar
                      key={index}
                      className={`text-xl ${index + 1 <= review.rating ? 'text-[#d26e4b]' : 'text-gray-300'}`}
                    />
                  ))}
                  <div className="ml-2 flex items-center">
                    <img 
                      src={`${BASE_URL_USER_IMG}${review.users.avatar}`} 
                      alt="User Avatar" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p className="text-gray-800 font-semibold">{review.users.full_name}</p>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">Đã đánh giá vào {formatDate(review.review_date)}</p>
              </div>
            ))
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              className={`px-3 py-1 border ${currentPage === 1 ? 'text-gray-400' : 'text-[#d26e4b] hover:bg-[#f5f5f5]'} `}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 border mx-1 ${currentPage === index + 1 ? 'bg-[#d26e4b] text-white' : 'text-[#d26e4b] hover:bg-[#f5f5f5]'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border ${currentPage === totalPages ? 'text-gray-400' : 'text-[#d26e4b] hover:bg-[#f5f5f5]'} `}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
