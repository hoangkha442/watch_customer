import React from 'react';
import TopBar from './TopBar/TopBar';
import HeaderMain from './HeaderMain/HeaderMain';
import HeaderBottomNav from './HeaderBottomNav/HeaderBottomNav';
import BackToTop from './BackToTop'; // Import component "Back to Top"

export default function Header() {
  return (
    <>
      <TopBar />
      <HeaderMain />
      <HeaderBottomNav />
      <BackToTop /> {/* Sử dụng nút "Back to Top" */}
    </>
  );
}
