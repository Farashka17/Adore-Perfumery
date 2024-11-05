import React from 'react'
import BigPerfume from '../../assets/BigPerfume.svg'
import { CiHeart } from "react-icons/ci";
import Product from './product';
import ReviewsAndDescription from './reviewsAndDescription';
const DetailPageComponent = () => {
  return (
    <div className="bg-[white]  md:mx-auto font-nunito ">
    <div className="container max-w-[1920px]    flex flex-col gap-10 justify-center mx-auto md:px-10 py-[25px] px-[15px] ">

       <Product/>
      <ReviewsAndDescription/>
        </div>
        </div>

     


  )
}

export default DetailPageComponent