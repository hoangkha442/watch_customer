import React from 'react';
import {  FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';

const HeaderMain = () => {
  return (
    <div className="header-main bg-[#333333] text-white py-4 relative border-b border-t border-gray-700" style={{ height: '100px', zIndex: 10 }}>
      <div className="header-inner flex flex-row justify-between items-center container mx-auto">

        {/* Logo */}
        <div className="logo flex flex-col">
          <a href="/" title="mVna" rel="home">
            <img width="200" height="100" src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png" className="header_logo" alt="mVna" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="search-form relative flex-grow">
          <form role="search" method="get" action="/search" className="searchform">
            <div className="flex justify-center">
              <input type="search" className="search-field w-[40%] px-3 py-2 rounded-l-[5px] text-sm h-10" name="s" placeholder="Tìm kiếm…" />
              <button type="submit" className="px-6 py-2 bg-[#c89979] rounded-r-[5px] text-white text-xl">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>

        {/* Right Elements */}
        <div className="flex items-center">
          <a href="/account" className="text-sm mx-2 hover:text-gray-300 flex items-center roboto-medium">
            ĐĂNG NHẬP
          </a>
          <a href="/wishlist" className="text-sm mx-2 hover:text-gray-300 flex items-center">
            <FaHeart className="mr-2 text-xl" />
          </a>
          <a href="/cart" className="text-sm mx-2 hover:text-gray-300 flex items-center">
            <FaShoppingCart className="mr-2 text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
