import React from 'react';
import Perfume from '../../../../frontend/src/assets/Perfume.svg'; 

const SingleOrderProductAdmin = ({ product }) => {
  return (
    <div className="flex gap-12 items-center bg-[#f7f7f6] px-5 py-3">
      <p className="flex flex-col font-raleway font-semibold text-[#232323]">
        Name:
        <span className='font-normal text-[#232323]'>{product.name}</span> 
      </p>
      <p className="flex flex-col font-raleway font-semibold text-[#232323]">
        Price:
        <span className='font-normal text-[#232323]'>${product.price}</span> 
      </p>
      <p className="flex flex-col font-raleway font-semibold text-[#232323]">
        Quantity:
        <span className='font-normal text-[#232323]'>{product.quantity}</span> 
      </p>
      <div className="w-[111px] h-[111px]">
        <img src={product.productPic || Perfume} className="bg-cover w-[100%] h-[111px]" /> 
      </div>
    </div>
  );
};

export default SingleOrderProductAdmin;
