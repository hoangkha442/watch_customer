import React from 'react'
import { WatchCard } from './WatchCard'
export default function Trending() {
  return (
    <div className="container py-16">
        <div className="flex justify-center items-center space-x-8">
            <WatchCard 
                title="Xu hướng 2024" 
                subtitle="ĐỒNG HỒ NAM" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg" 
                altText="Men's Watch" 
            />
            <WatchCard 
                title="Xu hướng 202024" 
                subtitle="ĐỒNG HỒ NỮ" 
                imageSrc="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg" 
                altText="Women's Watch" 
            />
    </div>
    </div>
  )
}
