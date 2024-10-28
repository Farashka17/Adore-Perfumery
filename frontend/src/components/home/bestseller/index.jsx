import React from 'react'
import SingleProduct from '../../common/singleProduct'

const BestSeller = () => {
  return (
    <div className=" mx-auto ">
      <div className="container max-w-[1120px] mx-auto flex flex-col items-center justify-center" >
        <div className='flex items-center justify-center flex-col'>
          <p className='text-[50px] font-dancing'>Best products</p>
          <p className='font-raleway text-[38px] font-thin text-[#232323] leading-[50px]'>Best Sellers Products</p>
          <p className='font-nunito font-extralight text-[18px] text-[#9A9A9A] mt-[10px] mb-[50px]'>The stylish and organized cosmetic products</p>
        </div>
        <div className='grid grid-cols-2 gap-y-10 gap-x-10 md:grid-cols-4 '>
           
            <SingleProduct/>
            <SingleProduct/>
            <SingleProduct/>
            <SingleProduct/>
        </div>
        <button className='border border-[#232323] font-raleway text-[13px] px-10 py-[19px] mt-[50px]'>Explore More</button>
    </div>
    </div>

  )
}

export default BestSeller