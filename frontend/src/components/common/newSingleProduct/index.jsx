import React from 'react'
import Perfume from '../../../assets/Perfume.svg'
import { Link } from 'react-router-dom'
const NewSingleProduct = () => {
  return (
   <Link to={"/product/:id"}>
    <div className=' mx-auto flex items-center gap-[30px]'>
    <div className='w-[133px] h-[159px] bg-[#e9e6ed] flex items-center justify-center'>
     <div className='w-[90%] h-[90%] border border-black transition-transform duration-300 transform hover:scale-110'>
   <img src={Perfume}/>
     </div>
    </div>
    <div>
      <p className='font-raleway font-thin text-[18px] text-[#232323]'>Dropped Body Oil</p>
        <p className='font-nunito text-[14px] font-extralight text-[#969696]'>$27.00</p>
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
    </div>

    </div>
    </Link> 
  )
}

export default NewSingleProduct

{/* <div className='flex flex-col justify-center items-center'>
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
<p className='font-raleway text-[20px] font-thin text-[#232323] mt-[19px]'>Body Oil & Lotion</p>
<div className='mt-[26px] flex items-stretch w-full'>
    <button className='font-raleway text-[13px] font-thin w-full  py-[19.8px] border border-[#232323] '>ADD TO CART</button>
    <button className='font-raleway text-[13px] font-thin  w-full py-[19.8px] border border-[#232323] '>$27.00 </button>
</div>
</div> */}