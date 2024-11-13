import React from 'react'
import SingleCartProduct from '../singleCartProduct'
import SingleProduct from '../../common/singleProduct'
import { MdOutlineClose } from 'react-icons/md'
import Perfume from '../../../assets/Perfume.svg'
import MobileSingleCartProduct from '../mobileSingleCartProduct'


const CartProducts = () => {
  return (
<div>
    <div className='md:flex flex-col justify-start  hidden '>
     
        <div className="container max-w-[1210px] flex items-center  mx-auto  justify-around  ">
    <div class="relative overflow-x-auto w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
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

<div className='md:hidden block'>
    <MobileSingleCartProduct/>
</div>
</div>
  )
}

export default CartProducts