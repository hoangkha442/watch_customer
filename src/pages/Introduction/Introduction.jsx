import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import AboutSpecial from './AboutSpecial/AboutSpecial'
import AboutProfile from './AboutProfile/AboutProfile'
import GetMoreInfo from '../HomePage/GetMoreInfo/GetMoreInfo'
import AboutComment from './AboutComment/AboutComment'

export default function Introduction() {
  return (
    <div className='pt-20'>
        <AboutUs />
        <AboutSpecial />
        <AboutProfile />
        <AboutComment />
        <GetMoreInfo />
    </div>
  )
}
