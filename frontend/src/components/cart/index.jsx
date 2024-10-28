import React from 'react'
import SingleCartProduct from './singleCartProduct'
import CartProducts from './cartProducts'
import PageTitleImageBackground from '../common/pageTitleImageBackground'

const Cart = () => {

    const title="Cart of Fragrances"

  return (
    <div className='flex flex-col'>
      <PageTitleImageBackground title={title}/>
       <CartProducts/>
    </div>
  )
}

export default Cart