import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from 'antd';
import { userLocalStorage } from '../../../services/LocalService';
import { fetchUserProfile } from '../../../redux/UserSlice';
import { fetchCart } from '../../../redux/CartSlice';

const HeaderMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const cartItems = useSelector(state => state.cart.items);
  const cartStatus = useSelector(state => state.cart.status);

  const [searchItem, setSearchItem] = useState('')
  useEffect(() => {
    dispatch(fetchUserProfile());
    setTimeout(() => {
      dispatch(fetchCart());
    }, 100);
  }, [dispatch]);

  const handleLogout = () => {
    navigate("/");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đăng xuất thành công",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      userLocalStorage.remove();
      window.location.reload();
    });
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/thong-tin-ca-nhan">
          Thông tin cá nhân
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/don-hang">
          Đơn hàng của bạn
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/wishlist">
          Các sản phẩm yêu thích
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/change-password">
          Thay đổi mật khẩu
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <p onClick={handleLogout}>
          Đăng xuất
        </p>
      ),
    },
  ];

  function getFirstAndLastChars(names) {
    const words = names.trim().split(' ');
    const firstWord = words[0];
    const lastWord = words[words.length - 1];
    return firstWord.charAt(0) + lastWord.charAt(lastWord.length - 1);
  }

  const handleSearch = (event) => { 
    event.preventDefault();
    navigate(`/search?q=${searchItem}`)
  }
  const handleOnchange = (event) => { 
    let {value} = event.target
    setSearchItem(value)  
  }

  return (
    <div className=" bg-[#333333] text-white py-4 relative border-b border-t border-gray-700" style={{ height: '100px', zIndex: 10 }}>
      <div className="header-inner flex flex-row justify-between items-center container mx-auto">

        {/* Logo */}
        <div className="logo flex flex-col">
          <a href="/" title="mVna" rel="home">
            <img width="200" height="100" src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png" className="header_logo" alt="mVna" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="search-form relative flex-grow">
          <form role="search" method="get" className="searchform" onSubmit={handleSearch}>
            <div className="flex justify-center">
              <input type="search" className="search-field w-[40%] px-3 py-2 rounded-l-[5px] text-sm h-10" name="s" placeholder="Tìm kiếm…" onChange={handleOnchange}/>
              <button type="submit" className="px-6 py-2 bg-[#c89979] rounded-r-[5px] text-white text-xl">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>

        {/* Right Elements */}
        <div className="flex items-center">
          {
            user ? <Dropdown className='mr-4'
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Avatar className='cursor-pointer' onClick={() => { navigate('/profile') }}>{getFirstAndLastChars(user?.full_name)}</Avatar>
            </Dropdown> : <a href="/dang-nhap" className="text-sm mx-2 hover:text-gray-300 flex items-center roboto-medium mr-4">
              ĐĂNG NHẬP
            </a>
          }
          <a href="/wishlist" className="text-sm mx-2 hover:text-gray-300 flex items-center">
            <FaHeart className="mr-2 text-xl" />
          </a>
          <div className="relative">
            <a href="/gio-hang" className="text-sm mx-2 hover:text-gray-300 flex items-center">
              <FaShoppingCart className="mr-2 text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute top-2 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
