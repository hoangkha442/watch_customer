import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/productService';
import Dropdown from './Dropdown/Dropdown';
import Category from './Category/Category';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import GetMoreInfo from '../HomePage/GetMoreInfo/GetMoreInfo';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import { message, Slider, Pagination } from 'antd';

export default function MenWatch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 10000000]); 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); 
  const [sortOption, setSortOption] = useState('Thứ tự mặc định');

  const sortingOptions = ['Thứ tự mặc định', 'Thứ tự theo mức độ phổ biến', 'Thứ tự theo điểm đánh giá', 'Giá từ cao đến thấp', 'Giá từ thấp đến cao', 'Đang giảm giá'];

  useEffect(() => {
    ProductService.getProduct()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          const filtered = res.data
            .filter((product) => product.category_id === 1)
            .map(product => {
              const discountedPrice = product.price - (product.price * product.promotion_percentage / 100);
              return { ...product, discountedPrice };
            });
          setProducts(filtered);
          applyFilterAndSort(filtered, sortOption, priceRange); 

          if (filtered.length > 0) {
            const prices = filtered.map(product => product.discountedPrice);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);
            setPriceRange([minPrice, maxPrice]);
            setTempPriceRange([minPrice, maxPrice]);
          }
        } else {
          console.error("Unexpected response structure:", res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAddToCart = (product_id) => {
    dispatch(addToCart({ product_id: product_id.product_id, quantity: 1 }))
      .then(() => {
        message.success('Thêm sản phẩm vào giỏ hàng thành công!');
      })
      .catch((error) => {
        console.error(error);
        message.error(error.message || 'Failed to add product to cart.');
      });
  };

  const handleTempPriceChange = (value) => {
    setTempPriceRange(value);
  };

  const applyFilter = () => {
    setPriceRange(tempPriceRange);
    applyFilterAndSort(products, sortOption, tempPriceRange);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    applyFilterAndSort(products, option, priceRange);
  };

  const applyFilterAndSort = (products, sortOption, priceRange) => {
    if (!Array.isArray(products)) return;

    const [minPrice, maxPrice] = priceRange;
    let filtered = products.filter(product => product.discountedPrice >= minPrice && product.discountedPrice <= maxPrice);

    switch (sortOption) {
      case 'Thứ tự theo mức độ phổ biến':
        filtered.sort((a, b) => b.quantity_sold - a.quantity_sold);
        break;
      case 'Giá từ cao đến thấp':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'Giá từ thấp đến cao':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'Đang giảm giá':
        filtered = filtered.filter(product => product.promotion_percentage > 0);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after filtering and sorting
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = Array.isArray(filteredProducts) ? filteredProducts.slice(startIndex, endIndex) : [];
  console.log('currentProducts: ', currentProducts);

  return (
    <div className='container pt-16'>
      <div className="flex justify-between pb-10">
        <div className="flex items-center space-x-4">
          <p onClick={() => { navigate('/') }} className='text-[#111] text-lg opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer'>TRANG CHỦ</p>
          <span className='text-[#111] text-lg opacity-60'>/</span>
          <p className='text-[#111] text-lg font-bold'>ĐỒNG HỒ NAM</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className='text-[#333]'>Hiển thị một kết quả duy nhất</span>
          <Dropdown
            options={sortingOptions}
            label="Sắp xếp: "
            onSelect={handleSortChange}
          />
        </div>
      </div>

      <div className="flex space-x-8 pb-16">
        <div className="">
          <Category />  
          <p className='mt-5 mb-2 text-[#353535] font-semibold text-lg uppercase'>lọc theo giá</p>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            step={100000}
            value={tempPriceRange}
            onChange={handleTempPriceChange}
          />
          <div className="flex items-center justify-between">
            <div className="text-end">
              <button onClick={applyFilter} className="mt-2 bg-[#666] text-[.85em] py-1 px-4 text-white font-bold rounded-3xl">Lọc</button>
            </div>
            <div className="flex justify-end gap-1 mt-2 text-sm">
              <span>Giá <span className='font-bold'>{tempPriceRange[0].toLocaleString('vi-VN')}đ</span></span>
              <p> — </p>
              <span className='font-bold'>{tempPriceRange[1].toLocaleString('vi-VN')} đ</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} handleAddToCart={handleAddToCart} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              // total={filteredProducts.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

      <GetMoreInfo />
    </div>
  );
}
