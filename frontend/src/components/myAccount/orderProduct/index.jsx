import React from 'react';
import Perfume from '../../../assets/Perfume.svg'; 

const SingleOrderProduct = ({ product }) => {
  return (
    <div className="flex gap-12 items-center bg-[#f7f7f6] px-5 py-3">
      <p className="flex flex-col font-raleway font-semibold">
        Name:
        <span className='font-normal'>{product.name}</span> 
      </p>
      <p className="flex flex-col font-raleway font-semibold">
        Price:
        <span  className='font-normal'>${product.price}</span> 
      </p>
      <p className="flex flex-col font-raleway font-semibold">
        Quantity:
        <span className='font-normal'>{product.quantity}</span> 
      </p>
      <div className="w-[111px] h-[111px]">
        <img src={product.productPic || Perfume} className="bg-cover w-[100%] h-[111px]" /> 
      </div>
    </div>
  );
};

export default SingleOrderProduct;
