import React, { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';

const Product = ({ product, id }) => {
  if (!product) return <p>Loading...</p>;

  const addToCart = useCartStore((state) => state.addToCart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { wishlist, fetchWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist(); 
  }, []);

  useEffect(() => {
    
    const inWishlist = wishlist?.some((item) => item.productId === product._id);
    setIsInWishlist(inWishlist);
  }, [wishlist, product._id]);

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id); 
    } else {
      addToWishlist(product._id); 
    }
  };

  const handleAddToCart = () => {
    addToCart(id, 1);
  };

  return (
    <div className="bg-white md:mx-auto font-nunito">
      <div className="container max-w-[1920px] flex flex-col md:flex-row gap-10 justify-center mx-auto md:px-10 py-6">
        <div className="container mx-auto">
          <div className='w-full h-auto'>
            <img src={product.productPic} alt="Perfume" className="w-full h-auto" />
          </div>
        </div>
        <div className='w-[90%] mx-auto'>
          <div>
            <p className='text-[35px] font-raleway'>{product.brand}</p>
          </div>
          <div className='w-full h-[2px] bg-[#dbaf77]'></div>
          <div className='mt-5'>
            <p className='text-[28px] font-raleway'>{product.name}</p>
          </div>
          <div className='mt-5'>
            <p className='text-[20px] font-raleway'>{product.concentration}</p>
          </div>
          <div className='mt-5 flex flex-col gap-5'>
            <p>Sizes</p>
            <div className='flex gap-2 items-center'>
              <button className='px-5 py-4 border border-[#232323] hover:bg-[#eaeaea]'>{product.volume}</button>
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-[28px] font-raleway'>Price: ${product.price}</p>
          </div>
          <div className='flex w-full gap-3 mt-4'>
            <button
              className={`px-3 border border-[#232323] ${
                isInWishlist ? 'bg-yellow-500' : 'bg-white'
              } hover:bg-[#eaeaea] flex items-center justify-center`}
              onClick={handleClick}
            >
              <CiHeart className="w-8 h-8 hover:text-[#dbaf77]" />
            </button>
            <button
              className="py-4 border border-[#232323] bg-black text-white hover:bg-[#dbaf77] w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
