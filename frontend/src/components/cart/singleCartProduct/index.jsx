import React, { useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import Perfume from '../../../assets/Perfume.svg'
const SingleCartProduct = () => {
    const [count, setCount] = useState(1);

    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      setCount(count > 0 ? count - 1 : 0); // Sayı 0'dan az olamaz
    };
    
  return (
    <div className="  md:mx-auto font-nunito w-full ">
        <div className='flex flex-col container mx-auto max-w-[1210px] '>

   
    <div className="container max-w-[1210px] flex items-center md:gap-[50px] lg:gap-[80px] mx-auto px-5 justify-around bg-red-100  ">
        <div>
            <button className='w-[30px] h-[30px]'><MdOutlineClose /></button>
        </div>
        <button className='w-[111px] h-[111px] '>
            <img src={Perfume} className='bg-cover  w-[100%] h-[111px]'/>
        </button>
        <button>
            <p className='font-raleway font-thin text-[16px] text-[#232323] hover:text-[#EAAA85]'>Basic Foundation</p>
        </button>
        <div>
            <p className='font-raleway font-extralight text-[16px] text-[#232323]'>$15.00</p>
        </div>
        <div className='flex items-center gap-2'>
            <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={decrement}>-</button>
            <p className='w-10 h-10 flex items-center justify-center border border-black'>{count}</p>
            <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={increment}>+</button>
        </div>
        <div>
            <p className='font-raleway font-extralight text-[16px] text-[#EAAA85]'>$15.00</p>
        </div>
    </div>
    <hr></hr>
    </div>
    </div>

  )
}

export default SingleCartProduct