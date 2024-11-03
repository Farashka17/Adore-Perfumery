import React, { useEffect } from 'react'
import Hero from './hero'
import Category from './category'
import AboutCosmetics from './aboutCosmetics'
import BestSeller from './bestseller'
import Brands from './brands'
import NewProducts from './newProducts'
import { getProducts } from '../../redux/productSlice'
import {useDispatch} from 'react-redux'
const HomeComponent = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])
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