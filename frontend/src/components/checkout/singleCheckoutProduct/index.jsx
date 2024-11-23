import React from 'react';

const SingleCheckoutProduct = ({ product, removeProduct }) => {
 
  return (
    <div className='flex justify-between items-center mt-4'>
      <div className='w-[60px] h-[60px]'>
        <img src={product.productPic} className='w-[70px] h-[70px]' alt={product.name} />
      </div>

      <div className='flex flex-col gap-2 items-start'>
        <p className='font-raleway font-thin text-[16px] text-[#232323]'>{product.name}</p>
        <p className='font-nunito text-[14px] font-extralight text-[#616161]'>
          ${product.price} × {product.quantity}
        </p>
      </div>

      <div>
        <p className='text-[#EAAA85] font-nunito font-extralight text-[14px]'>
          ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>

      {/* <button 
        className='text-[22px] font-nunito font-extralight text-[#EAAA85] flex items-start justify-start'
        onClick={() => removeProduct(product.id)} // Ürün kaldırma fonksiyonu
      >
        x
      </button> */}
    </div>
  );
};

export default SingleCheckoutProduct;
