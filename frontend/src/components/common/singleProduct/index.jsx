import React from 'react'
import Perfume from '../../../assets/Perfume.svg'
const SingleProduct = () => {
  return (
  <div className=' mx-auto'>
    <div className=' h-[160px] md:h-[324px] bg-[#e9e6ed] flex items-center justify-center'>
     <div className='w-[90%] h-[90%] border border-black transition-transform duration-300 transform hover:scale-110'>
   <img src={Perfume} className='w-[90%] '/>
     </div>
    </div>
    <div className='flex flex-col justify-center items-center'>
    <div className="flex ">
      {[...Array(5)].map((_, index) => (
        <span 
          key={index} 
          className='text-yellow-500'
        >
          ★
        </span>
      ))}
    </div>
    <p className='font-raleway  text-[14px] md:text-[20px] font-thin text-[#232323] mt-[19px]'>Body Oil & Lotion</p>
    <div className='mt-[26px] flex items-stretch w-full'>
        <button className='font-raleway text-[10px] md:text-[13px] font-thin w-full  py-[19.8px] border border-[#232323] '>ADD TO CART</button>
        <button className='font-raleway text-[10px] md:text-[13px] font-thin  w-full py-[19.8px] border border-[#232323] '>$27.00 </button>
    </div>
    </div>
    </div>
  )
}

export default SingleProduct
