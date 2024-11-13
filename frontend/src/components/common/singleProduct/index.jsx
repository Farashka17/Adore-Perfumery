import React from 'react';
import Perfume from '../../../assets/Perfume.svg';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../store/useCartStore'; // Zustand store importu

const SingleProduct = ({ name, price, productPic, id }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link yönlendirmesini engelle
    addToCart({ id, name, price, productPic });
  };
  return (
    <Link to={`/products/${id}`}>
      <div className='mx-auto cursor-pointer'>
        <div className='w-[180px] md:w-[250px] h-[260px] md:h-[324px] bg-[#e9e6ed] mx-auto flex items-center justify-center'>
          <div className='w-[80%] h-[80%] border border-black transition-transform duration-300 transform hover:scale-125'>
            <img src={productPic} className='h-[100%] w-full' />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className="flex ">
            {[...Array(5)].map((_, index) => (
              <span key={index} className='text-yellow-500'>★</span>
            ))}
          </div>
          <p className='font-raleway text-[14px] md:text-[20px] font-thin text-[#232323] mt-[19px] truncate w-[90%] text-center'>
            {name}
          </p>
          <div className='mt-[26px] flex items-stretch w-full'>
            <button className="button" onClick={handleAddToCart}>
              <span>ADD TO CART</span>
            </button>
            <button className='font-raleway text-[10px] md:text-[13px] font-thin w-full py-[19.8px] border border-[#232323]'>{price}$</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
