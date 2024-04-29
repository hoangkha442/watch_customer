import React from 'react';
import NewsCard from './NewsCard';

export default function News() {
  const news = [
    {
      id: 1,
      imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/new-4.jpg',
      name: "dongHo1",
      title: "Chiếc đồng hồ của những CEO quyền lực nhất thế giới",
      description: "Đối với một số doanh nhân, một chiếc đồng hồ đeo tay không chỉ là ..."
    },
    {
      id: 2,
      imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg',
      name: "dongHo2",
      title: "12 chiếc đồng hồ dành cho nữ giới đắt giá nhất mọi thời đại",
      description: "Công nghiệp sản xuất đồng hồ sang trọng có dấu hiệu chững lại trong hai ..."
    },
    {
      id: 3,
      imageUrl: 'https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/new-3.jpg',
      name: "dongHo3",
      title: "10 thương hiệu đồng hồ cao cấp hàng đầu mọi quý ông đều quan tâm, Rolex xếp hạng",
      description: "1. Audemars Piguet Được thành lập vào năm 1875 bởi Jules-Louis Audemars và Edward-Auguste Piguet, ..."
    }
  ];

  return (
    <div className='pb-24 container'>
        <div className="grid grid-cols-3 gap-8 items-center">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
    </div>
  );
}
