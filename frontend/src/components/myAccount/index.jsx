import React from 'react'
import OrdersComponent from './orders'
import AccountInformation from '../accountInformation'
import Adress from './adress'

const MyAccount = () => {
  return (
    <div className="bg-[white]  md:mx-auto font-nunito ">
    <div className="container max-w-[1320px]    flex flex-col  gap-10 justify-center mx-auto md:px-10 py-[25px] px-[15px] ">
        {/* sidebar */}
        <div className='flex justify-between flex-col md:flex-row items-start px-20'>
          <button>  <p className='text-[20px] font-raleway font-thin '>Account Information</p></button>
          <button>  <p className='text-[20px] font-raleway font-thin '>Orders</p></button>
          <button>  <p className='text-[20px] font-raleway font-thin '>Adress</p></button>
          <button>  <p className='text-[20px] font-raleway font-thin '>Sign out</p></button>
        </div>

        <div>
    {/* <OrdersComponent/> */}
    {/* <AccountInformation/> */}
    <Adress/>
        </div>
        </div>
        </div>

  )
}

export default MyAccount