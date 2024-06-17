import React from 'react'
import { WatchCard } from './WatchCard'
export default function Trending() {
  return (
    <div className="container py-16">
        <div className="flex justify-center items-center space-x-8">
            <WatchCard 
            className="w-full"
            linkNavigate={'dong-ho-nam'}
            styleLine="max-w-[70px] h-[1px] bg-[#c89979] mt-2.5 mb-2.5"
            customeStyle="w-full h-[300px]"
                title="Xu hướng 2024" 
                subtitle="ĐỒNG HỒ NAM" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg" 
                altText="Men's Watch" 
            />
            <WatchCard 
            styleLine="max-w-[70px] h-[1px] bg-[#c89979] mt-2.5 mb-2.5"
            customeStyle="w-full h-[300px]"
                linkNavigate={'dong-ho-nu'}
                title="Xu hướng 202024" 
                subtitle="ĐỒNG HỒ NỮ" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg" 
                altText="Women's Watch" 
            />
    </div>
    </div>
  )
}
