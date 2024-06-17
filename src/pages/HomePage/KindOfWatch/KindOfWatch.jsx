import React from 'react'
import { WatchCard } from '../Trending/WatchCard'
import { useNavigate } from "react-router-dom";
export default function KindOfWatch() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center space-x-8 py-20 container">
            <WatchCard 
            className="w-full"
                linkNavigate={'dong-ho-co-dien'}
                customeStyle="h-[250px] w-full"
                titleKOW="CỔ ĐIỂN" 
                subtitleKOF="Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg" 
                altText="Men's Watch" 
            />
            <WatchCard 

                className="w-full"
                linkNavigate={'dong-ho-thong-minh'}
                customeStyle="h-[250px] w-full"
                titleKOW="SMART WATCH" 
                subtitleKOF="Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg" 
                altText="Women's Watch" 
            />
    </div>
  )
}
