import React, { useState } from 'react'
import { MdExpandMore } from 'react-icons/md';
export default function Category() {
    const [dropdownOpen, setDropdownOpen] = useState(true);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="">
        <p className='mb-4 text-[#353535] font-semibold text-lg'>DANH MỤC SẢN PHẨM</p>
        <div className="w-64 p-4 bg-[#dddddd1a] border border-[#ddd] rounded">
            <div className="flex flex-col justify-between flex-1">
                <nav>
                    <div className="py-1text-sm text-[#353535] font-medium rounded-lg cursor-pointer flex items-center justify-between" onClick={toggleDropdown}>
                        Sản phẩm
                        <span className={`inline-block ml-2 transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                            <MdExpandMore  className='text-base'/>
                        </span>
                    </div>
                    {dropdownOpen && (
                        <div className="duration-500 transition-all mt-2 space-y-2 px-4 bg-[#dddddd1a] border border-[#ddd] rounded text-[#334862] text-[13px]">
                            <a className="block py-2 mt-2 transition-all duration-300 hover:text-[#c89979] border-b border-dashed border-[#ddd]" href="/dong-ho-nu">Đồng hồ nữ</a>
                            <a className="block py-1 mt-2 transition-all duration-300 hover:text-[#c89979] border-b border-dashed border-[#ddd]" href="/dong-ho-nam">Đồng hồ nam</a>
                            <a className="block py-1 mt-2 transition-all duration-300 hover:text-[#c89979] border-b border-dashed border-[#ddd]" href="/dong-ho-co-dien">Đồng hồ Cổ điển</a>
                            <a className="block pb-3 mt-2 transition-all duration-300 hover:text-[#c89979]" href="/dong-ho-thong-minh">Đồng hồ thông minh</a>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    </div>
  )
}
