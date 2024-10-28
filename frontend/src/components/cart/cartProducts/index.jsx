import React from 'react'
import SingleCartProduct from '../singleCartProduct'
import SingleProduct from '../../common/singleProduct'
import { MdOutlineClose } from 'react-icons/md'
import Perfume from '../../../assets/Perfume.svg'


const CartProducts = () => {
  return (
    // <div className='flex flex-col justify-start '>
    //     <div>
    //     <div className="container max-w-[1210px] flex items-center  mx-auto px-5 justify-around  bg-red-300  ">
    //     <div className='bg-yellow-400'>
    //     </div>
    //     <div className='bg-green-500'>
    //     </div>
    //     <div className='bg-green-500'>
    //         <p className='font-raleway font-thin text-[16px] text-[#232323] '>Product</p>
    //     </div>
    //     <div className='bg-yellow-500'>
    //         <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Price</p>
    //     </div>
    //     <div className='flex items-center gap-2 bg-slate-500'>
    //     <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Quantity</p>

    //     </div>
    //     <div className='bg-blue-500 '>
    //         <p className='font-raleway font-extralight text-[16px] text-[#232323]'>Subtotal</p>
    //     </div>
    // </div>
    //     </div>
    //   <SingleCartProduct/>
    
    // </div>

    <div className='flex flex-col justify-start '>
     
        <div className="container max-w-[1210px] flex items-center  mx-auto  justify-around  ">
<div class="relative overflow-x-auto w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-b  border-b-black">
            <tr>
            <th scope="col" className="px-6 py-3 font-raleway font-thin">
                   
                </th>
                <th scope="col" className="px-6 py-3 font-raleway font-thin text-[18px]">
                   
                   </th>
                <th scope="col" className="px-6 py-3 font-raleway font-thin text-[18px]">
                    Product 
                </th>
                <th scope="col" className="px-6 py-3 font-raleway font-thin text-[18px]">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 font-raleway font-thin text-[18px]">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3 font-raleway font-thin text-[18px]">
                    Subtotal
                </th>
            </tr>
        </thead>
        <tbody>
         <SingleCartProduct/>
     
        </tbody>
    </table>
</div>
</div>
</div>
  )
}

export default CartProducts