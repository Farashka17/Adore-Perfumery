import React from 'react'
import SingleCartProduct from './singleCartProduct'
import CartProducts from './cartProducts'
import PageTitleImageBackground from '../common/pageTitleImageBackground'
import OrderButton from './orderButton'

const Cart = () => {

    const title="Cart of Fragrances"

  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1920px]  flex flex-col  mx-auto md:px-10 py-[25px] px-[15px]">
      <PageTitleImageBackground title={title}/>
       <CartProducts/>
       <OrderButton/>
    </div>
    </div>

  )
}

export default Cart