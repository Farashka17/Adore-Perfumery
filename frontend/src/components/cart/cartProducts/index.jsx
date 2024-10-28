import React from 'react'
import SingleCartProduct from '../singleCartProduct'
import SingleProduct from '../../common/singleProduct'
import { MdOutlineClose } from 'react-icons/md'
import Perfume from '../../../assets/Perfume.svg'


const CartProducts = () => {
  return (
    <div className='flex flex-col justify-start '>
        <div>
        <div className="container max-w-[1210px] flex items-center  mx-auto px-5 justify-around  bg-red-300  ">
        <div className='bg-yellow-400'>
        </div>
        <div className='bg-green-500'>
        </div>
        <div className='bg-green-500'>
            <p className='font-raleway font-thin text-[16px] text-[#232323] '>Product</p>
        </div>
        <div className='bg-yellow-500'>
            <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Price</p>
        </div>
        <div className='flex items-center gap-2 bg-slate-500'>
        <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Quantity</p>

        </div>
        <div className='bg-blue-500 '>
            <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Subtotal</p>
        </div>
    </div>
        </div>
      <SingleCartProduct/>
    
    </div>
  )
}

export default CartProducts