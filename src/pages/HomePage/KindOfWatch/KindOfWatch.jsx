import React from 'react'
import { WatchCard } from '../Trending/WatchCard'

export default function KindOfWatch() {
  return (
    <div className="flex justify-center items-center space-x-8 py-20 container">
            <WatchCard 
            className="w-full"
                customeStyle="h-[250px] w-full"
                titleKOW="CỔ ĐIỂN" 
                subtitleKOF="Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg" 
                altText="Men's Watch" 
            />
            <WatchCard 
                className="w-full"
                customeStyle="h-[250px] w-full"
                titleKOW="SMART WATCH" 
                subtitleKOF="Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg" 
                altText="Women's Watch" 
            />
    </div>
  )
}
