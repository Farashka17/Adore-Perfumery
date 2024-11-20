import React from 'react'
import { FaPlus } from "react-icons/fa6";

const Adress = () => {
  return (
    <div className='w-[100%]  px-20 '>
        <div className='flex items-center justify-between  w-full '>
            <p className='text-[26px]'>My Adresses</p>
            <button className='flex items-center gap-1 py-3 '>
            <FaPlus className='text-yellow-600 w-[23px] h-[23px]'/>
            <p className='text-[24px]'>New Adress</p>
            </button>
        </div>
    </div>
  )
}

export default Adress