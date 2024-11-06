import React from 'react'
import { Link } from 'react-router-dom'

const OrderButton = () => {
  return (
    <div className="bg-[white] container max-w-[1210px]  md:mx-auto font-nunito w-full mt-10 px-5">
    <div className="  flex flex-col justify-center items-center md:justify-end md:items-end mx-auto">
        <div >
            <button className='font-raleway  text-[13px] font-thin py-[19px] px-[50px] bg-gray-300 hover:bg-[#dbaf77]'>Update Cart</button>
        </div>
    </div>
    <div className='flex justify-end items-end mt-20'>
      <div className='flex flex-col w-[390px]  '>
        <p className='font-thin font-raleway text-[24px] text-[#232323]'>Cart Totals</p>
        <div className='flex justify-between items-center mt-10'>
          <p className='font-raleway font-thin text-[18px] text-[#232323]'>Subtotal</p>
          <p className='font-nunito font-extralight text-[18px] text-[#232323]'>$15.00</p>
        </div>
        <div className='flex justify-between items-center mt-10'>
          <p className='font-raleway font-thin text-[18px] text-[#232323]'>Total</p>
          <p className='font-nunito font-extralight text-[18px] text-[#232323]'>$15.00</p>
        </div>
        <div className='mt-4'>
        <Link to={"/checkout"}> <button className='font-raleway  text-[15px] font-thin w-full justify-center items-center py-5 border border-[#232323] uppercase hover:bg-[#dbaf77]'>Proceed to Checkout</button></Link> 
        </div>
      </div>
    </div>
    </div>

  )
}

export default OrderButton