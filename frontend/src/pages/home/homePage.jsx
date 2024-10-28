import React from 'react'
import Hero from '../../components/home/hero'

import Category from '../../components/home/category'
import AboutCosmetics from '../../components/home/aboutCosmetics'
import Brands from '../../components/home/brands'
import BestSeller from '../../components/home/bestseller'
import NewProducts from '../../components/home/newProducts'

const HomePage = () => {
  return (
    <div>
        <Hero/>
      
        <Category/>
        <AboutCosmetics/>
        <BestSeller/>
        <Brands/>
        <NewProducts/>
    </div>
  )
}

export default HomePage