import React, { useState } from 'react'
import Adress from './adress'
import Payment from './payment'
import { useCartStore } from '../../store/useCartStore';

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const [userDetails, setUserDetails] = useState({});
  return (
    <div className='md:flex flex-col justify-start  '>
    <div className="container max-w-[1210px] flex flex-col md:flex-row  mx-auto gap-10  ">
     <Adress   onDetailChange={setUserDetails}/>
     <Payment subtotal={subtotal}  userDetails={userDetails}/>
      </div>
      </div>

  )
}

export default Checkout