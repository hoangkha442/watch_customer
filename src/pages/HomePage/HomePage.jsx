import React from 'react'
import Banner from './Banner/Banner'
import Trending from './Trending/Trending'
import BestSelling from './BestSelling/BestSelling'
import KindOfWatch from './KindOfWatch/KindOfWatch'
import ProductTab from './ProductTab/ProductTab'
import News from './News/News'
import GetMoreInfo from './GetMoreInfo/GetMoreInfo'

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Trending />
      <BestSelling />
      <KindOfWatch />
      <ProductTab />
      <News />
      <GetMoreInfo />
    </div>
  )
}
