import React from 'react';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Giới thiệu', path: '/gioi-thieu' },
  { name: 'Đồng hồ nam', path: '/dong-ho-nam' },
  { name: 'Đồng hồ nữ', path: '/dong-ho-nu' },
  { name: 'Liên hệ', path: '/lien-he' },
  // ...other nav links
];

const HeaderBottomNav = () => {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className="header-bottom bg-[#333333] border-t border-b border-gray-700 roboto-regular h-full">
      <div className="container mx-auto h-full">
        <ul className="flex uppercase text-white text-sm justify-center items-center py-4 space-x-16">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                className={`nav-top-link mb-2 hover:text-[#c89979] transition-all duration-300 hover:border-b hover:border-[#c89979] hover:mb-1 ${isActive(link.path) ? 'text-[#c89979]' : ''}`}
                style={isActive(link.path) ? { borderBottom: '1px solid #C89979', paddingBottom: '2px' } : {paddingBottom: '2px'}}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottomNav;
