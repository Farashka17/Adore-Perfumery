import React from 'react';
import Perfume from '../../../../frontend/src/assets/Perfume.svg'; 

const SingleOrderProductAdmin = ({ product }) => {
  return (
    <div className="flex gap-12 items-center bg-[#f7f7f6] px-5 py-3">
      <p className="flex flex-col font-raleway">
        Name:
        <span>{product.name}</span> 
      </p>
      <p className="flex flex-col font-raleway">
        Price:
        <span>${product.price}</span> 
      </p>
      <div className="w-[111px] h-[111px]">
        <img src={product.productPic || Perfume} className="bg-cover w-[100%] h-[111px]" /> 
      </div>
    </div>
  );
};

export default SingleOrderProductAdmin;
