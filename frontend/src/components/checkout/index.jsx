import React from 'react'
import Adress from './adress'
import Payment from './payment'

const Checkout = () => {
  return (
    <div className='md:flex flex-col justify-start  '>
    <div className="container max-w-[1210px] flex flex-col md:flex-row  mx-auto gap-10  ">
     <Adress/>
     <Payment/>
      </div>
      </div>

  )
}

export default Checkout