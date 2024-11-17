import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../store/useCartStore';

const OrderButton = ({ subtotal, shippingCost }) => {
  const { cart } = useCartStore(); // Cart'tan ürünleri al
  const isEmptyCart = subtotal === 0;
  const total = isEmptyCart ? 0 : subtotal + (shippingCost === 0 ? 0 : 3.99);

  return (
    <div className="bg-[white] container max-w-[1210px] md:mx-auto font-nunito w-full mt-10 px-5">
      <div className="flex flex-col justify-center items-center md:justify-end md:items-end mx-auto"></div>
      <div className='flex justify-end items-end mt-20'>
        <div className='flex flex-col w-[390px]'>
          <p className='font-thin font-raleway text-[24px] text-[#232323]'>Cart Totals</p>
          <div className='flex justify-between items-center mt-10'>
            <p className='font-raleway font-thin text-[18px] text-[#232323]'>Subtotal</p>
            <p className='font-nunito font-extralight text-[18px] text-[#232323]'>${isEmptyCart ? '0.00' : subtotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between items-center mt-2'>
            <p className='font-raleway font-thin text-[18px] text-[#232323]'>Shipping Cost</p>
            {isEmptyCart ? (
              <p className="font-nunito font-extralight text-[18px] text-[#232323]">$0.00</p>
            ) : shippingCost === 0 ? (
              <div className="flex items-center gap-1">
                <span className='text-[18px] line-through'>$3.99</span>
                <span className="text-red-500 font-thin text-[20px]">Free</span>
              </div>
            ) : (
              <p className='font-nunito font-extralight text-[18px] text-[#232323]'>$3.99</p>
            )}
          </div>
          <div className='flex justify-between items-center mt-10'>
            <p className='font-raleway font-thin text-[18px] text-[#232323]'>Total</p>
            <p className='font-nunito font-extralight text-[18px] text-[#232323]'>${isEmptyCart ? '0.00' : total.toFixed(2)}</p>
          </div>
          <div className='mt-4'>
            <Link to={isEmptyCart ? "#" : "/checkout"}>
              <button 
                className={`font-raleway text-[15px] font-thin w-full justify-center items-center py-5 border border-[#232323] uppercase ${isEmptyCart ? 'cursor-not-allowed' : 'hover:bg-[#dbaf77]'}`}
                disabled={isEmptyCart}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderButton;