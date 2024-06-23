// src/components/BillingInformation.js
import React from 'react';

const BillingInformation = ({ formData, handleChange, errors, provinces }) => {
  return (
    <div className='p-4 border-t-2 border-[#ddd]'>
      <h1 className="text-[1.1em] overflow-hidden pt-2 pb-4 font-bold uppercase text-[#1c1c1c]">Thông Tin Thanh Toán</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Họ và tên *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Số điện thoại *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Địa chỉ email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Quốc gia *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out"
          >
            <option>Việt Nam</option>
            {/* Add other countries as needed */}
          </select>
        </div>
        <div>
          <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Địa chỉ *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={`mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-[.9em] mb-[.4em] font-bold text-[#222]">Tỉnh / Thành phố *</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className={`mt-1 block w-full p-2 px-3 h-[2.507em] text-[.97em] bg-white text-[#333] border border-[#ddd] shadow-inner transition-colors duration-300 ease-in-out ${errors.city ? 'border-red-500' : ''}`}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map(province => (
              <option key={province.province_id} value={province.province_name}>{province.province_name}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
      </form>
    </div>
  );
};

export default BillingInformation;
