import React from 'react'
import Banner from './Banner/Banner'
import Trending from './Trending/Trending'
import BestSelling from './BestSelling/BestSelling'

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Trending />
      <BestSelling />
    </div>
  )
}
