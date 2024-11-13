import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import Perfume from '../../../assets/Perfume.svg'
import { useCartStore } from '../../../store/useCartStore';

const MobileSingleCartProduct = ({ product }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const increment = () => updateQuantity(product.id, 1);
  const decrement = () => updateQuantity(product.id, -1);
    
  return (
    <div className='flex flex-col justify-start items-start  gap-y-5 px-5'>
        <div className='border-b w-full border-b-black border-opacity-50'>
            <button className='w-[30px] h-[30px]' onClick={() => removeFromCart(product.id)}><MdOutlineClose /></button>
        </div>
        <div className='border-b w-full border-b-black border-opacity-50'>
        <button className='w-[111px] h-[111px] \'>
            <img src={product.productPic} className='bg-cover  w-[100%] h-[111px]'/>
        </button>
        </div>
        <div className='border-b w-full border-b-black border-opacity-50 flex justify-between items-center'>
        <p className='font-raleway font-thin text-[16px] text-[#232323] hover:text-[#EAAA85] text-left'>Product:</p>
            <p className='font-raleway font-thin text-[16px] text-[#232323] hover:text-[#EAAA85] text-left'>{product.name}</p>
        </div>
        <div className='border-b w-full border-b-black border-opacity-50 flex justify-between items-center'>
        <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Price:</p>
            <p className='font-raleway font-extralight text-[16px] text-[#232323]'>{product.price}$</p>
        </div>
        <div className='flex justify-between items-center border-b w-full border-b-black border-opacity-50'>
          <div>
            <p>Quantity:</p>
          </div>
        <div className='flex items-center gap-2  pb-5'>
          <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={decrement}>-</button>
            <p className='w-10 h-10 flex items-center justify-center border border-black'>{product.quantity}</p>
            <button className='w-10 h-10 flex items-center justify-center border border-black' onClick={increment}>+</button>
        </div>
         </div>
        <div className='flex items-center justify-between'>
        <p className='font-raleway font-extralight text-[16px] text-[#EAAA85]'>Subtotal:</p>
            <p className='font-raleway font-extralight text-[16px] text-[#EAAA85]'>{(product.price * product.quantity).toFixed(2)}$</p>
        </div>
    </div>
  )
}

export default MobileSingleCartProduct