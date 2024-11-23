import React, { useEffect } from 'react'
import Hero from './hero'
import Category from './category'
import AboutCosmetics from './aboutCosmetics'
import BestSeller from './bestseller'
import Brands from './brands'
import NewProducts from './newProducts'

const HomeComponent = () => {

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

export default HomeComponent