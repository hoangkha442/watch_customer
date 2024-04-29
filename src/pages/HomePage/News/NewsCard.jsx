
import React from 'react';

export default function NewsCard({ news }) {
  return (
    <div >
        <div className="overflow-hidden">
          <img className="object-cover w-full h-52 rounded hover:scale-110 transition-all duration-500 cursor-pointer" src={news.imageUrl} alt={news.name} />
        </div>
        <div>
          <h4 className='text-lg font-bold my-2'>{news.title}</h4>
          <p className='text-sm'>{news.description}</p>
        </div>
    </div>
  );
}
