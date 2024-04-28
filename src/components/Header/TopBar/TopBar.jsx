import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div id="top-bar" className="bg-[#333333] text-white p-3 hidden md:flex md:justify-between roboto-regular">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-auto md:flex-1 flex justify-start">
          <ul className="flex list-none p-0 m-0">
            <li className="mr-6 flex items-center gap-1">
                <FaMapMarkerAlt  className='text-lg'/>
              <p className="text-sm">319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM</p>
            </li>
            <li>
              <p className="text-sm flex items-center gap-1">
                <FaPhone className='text-lg'/>
                <a href="tel:0769220162" className="hover:text-gray-300">076 922 0162</a>
              </p>
            </li>
          </ul>
        </div>

        {/* Center section could be added here if needed */}

        <div className="w-full md:w-auto md:flex-1 flex justify-end">
          <ul className="flex list-none p-0 m-0">
            <li>
              <div className="flex space-x-2">
                <a href="http://url" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-gray-300">
                  <FaFacebook />
                </a>
                <a href="http://url" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-gray-300">
                  <FaInstagram />
                </a>
                <a href="http://url" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-gray-300">
                  <FaTwitter />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
