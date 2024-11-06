import React from 'react'
import Perfume from '../../../assets/Perfume.svg'
const SingleCheckoutProduct= () => {
  return (
    <div className='flex justify-between items-center mt-4'>
        <div className='w-[60px] h-[60px]'>
            <img src={Perfume} className='w-[70px] h-[70px]'/>
        </div>
       
        <div className='flex flex-col gap-2 items-start'>
            <p className='font-raleway font-thin text-[16px] text-[#232323] '>Body Oil & Lotion</p>
            <p className='font-nunito text-[14px] font-extralight text-[#616161]'>$15.00 × 1</p>
        </div>
        <div>
            <p className='text-[#EAAA85] font-nunito font-extralight text-[14px]'>$15.00</p>
        </div>
        <button className='text-[22px] font-nunito font-extralight text-[#EAAA85] flex items-start justify-start'>x</button>
      
    </div>
  )
}

export default SingleCheckoutProduct