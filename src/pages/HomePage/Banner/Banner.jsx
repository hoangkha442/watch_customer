import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
export default function Banner() {
  const styleBtn = `text-[#f2f2f2] border border-[#f2f2f2] px-6 py-2 text-base font-bold hover:bg-[#c89979] hover:border-[#c89979] transition-all duration-300`
  return (
    <div>
      <Carousel autoPlay>
        <div className="">
          <img src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-1.jpg" />
          <div className="text-inner legend roboto container text-white-i">
            <h4 className="font-bold text-2xl">Mona Watch</h4>
            <h1 className="text-[56px] font-bold">Đồng hồ Classico</h1>
            <p className="text-[#f1f1f1] text-base mb-5">
              Cùng với sự phát triển không ngừng của thời trang thế giới, rất
              nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
              dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
            </p>
            <button
              className={styleBtn}
              style={{ borderRadius: 5 }}
            >
              <span>Xem sản phẩm</span>

            </button>
          </div>
        </div>
        <div>
          <img src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-2.jpg" />
          <div class="text-inner legend roboto container text-white-i">
            <h4 className="font-bold text-2xl">Mona Watch</h4>
            <h1 className="text-[56px] font-bold">Đồng hồ Classico</h1>
            <p className="text-[#f1f1f1] text-base mb-5">
              Cùng với sự phát triển không ngừng của thời trang thế giới, rất
              nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
              dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
            </p>
            <button
              className={styleBtn}
              style={{ borderRadius: 5 }}
            >
              <span>Xem sản phẩm</span>
            </button>

          </div>
        </div>
      </Carousel>
    </div>
  );
}
