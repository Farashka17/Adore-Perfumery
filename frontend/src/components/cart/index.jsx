import React from 'react'
import SingleCartProduct from './singleCartProduct'
import CartProducts from './cartProducts'
import PageTitleImageBackground from '../common/pageTitleImageBackground'
import OrderButton from './orderButton'

const Cart = () => {

    const title="Cart of Fragrances"

  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="w-full flex flex-col  mx-auto  py-[25px]">
      <PageTitleImageBackground title={title}/>
       <CartProducts/>
       <OrderButton/>
    </div>
    </div>

  )
}

export default Cart