import React, { useState } from 'react';

const Detail = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  return (
    <div className="container py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row space-x-5">
        <div className="md:w-1/2">
          <img src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png" alt="Classico 3 Watch" className="object-cover" />
        </div>
        <div className="md:w-1/2 md:pl-10">
            <div className="flex items-center text-sm uppercase text-[#111]">
                <p className='opacity-70'>Trang chủ</p>
                <p className='mx-3'>/</p>
                <p className='opacity-70'>Best-saller</p>
            </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 md:mt-0">Classico 3</h2>
          <p className="text-gray-500 mt-2">700,000 đ</p>
          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper.
          </p>
          <div className="flex items-center mt-5">
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1"
              onClick={decrement}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="text-center w-10 border border-gray-300 py-1"
            />
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1"
              onClick={increment}
            >
              +
            </button>
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 ml-4"
            >
              THÊM VÀO GIỎ
            </button>
          </div>
          <div className="py-5">
      <button className="hover:text-blue-800 focus:outline-none text-sm">
        Thêm yêu thích
      </button>

        <p className="text-gray-800 border-y-[0.5px] border-[#33333317] my-1 text-sm">Mã: P006-1-1</p>
        <p className="text-gray-800 text-sm">Danh mục: Best seller</p>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
