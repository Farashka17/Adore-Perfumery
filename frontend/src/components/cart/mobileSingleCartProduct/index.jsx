import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import Perfume from '../../../assets/Perfume.svg'

const MobileSingleCartProduct = () => {
    const [count, setCount] = useState(1);

    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      setCount(count > 0 ? count - 1 : 0); // Sayı 0'dan az olamaz
    };
    
  return (
    <div className='flex flex-col justify-start items-start  gap-y-5'>
        <div className='border-b w-full border-b-black border-opacity-50'>
            <button className='w-[30px] h-[30px]'><MdOutlineClose /></button>
        </div>
        <div className='border-b w-full border-b-black border-opacity-50'>
        <button className='w-[111px] h-[111px] \'>
            <img src={Perfume} className='bg-cover  w-[100%] h-[111px]'/>
        </button>
        </div>
        <button className='border-b w-full border-b-black border-opacity-50'>
            <p className='font-raleway font-thin text-[16px] text-[#232323] hover:text-[#EAAA85] text-left'>Basic Foundation</p>
        </button>
        <div className='border-b w-full border-b-black border-opacity-50'>
            <p className='font-raleway font-extralight text-[16px] text-[#232323]'>$15.00</p>
        </div>
        <div className='flex items-center gap-2 border-b w-full border-b-black border-opacity-50 pb-5'>
            <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={decrement}>-</button>
            <p className='w-10 h-10 flex items-center justify-center border border-black'>{count}</p>
            <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={increment}>+</button>
        </div>
        <div className=''>
            <p className='font-raleway font-extralight text-[16px] text-[#EAAA85]'>$15.00</p>
        </div>
    </div>
  )
}

export default MobileSingleCartProduct