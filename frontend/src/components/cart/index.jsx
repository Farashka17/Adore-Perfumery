import React from 'react'
import SingleCartProduct from './singleCartProduct'
import CartProducts from './cartProducts'
import PageTitleImageBackground from '../common/pageTitleImageBackground'
import OrderButton from './orderButton'
import { useCartStore } from '../../store/useCartStore'

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  // Shipping cost belirleme (200$ altı için 3.99$ kargo ücreti, üstü için ücretsiz)
  const shippingCost = subtotal < 200 ? 3.99 : 0;

    const title="Cart of Fragrancies"

  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="w-full flex flex-col  mx-auto  py-[25px]">
      <PageTitleImageBackground title={title}/>
       <CartProducts/>
       <OrderButton subtotal={subtotal} shippingCost={shippingCost}/>
    </div>
    </div>

  )
}

export default Cart