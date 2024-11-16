import React, { useEffect } from 'react';
import { useWishlistStore } from '../../../store/useWishlistStore';
import SingleProduct from '../../common/singleProduct'

const WishlistProducts = () => {
  const { wishlist, getWishlist } = useWishlistStore(); // Wishlist store'u

  useEffect(() => {
    getWishlist(); // Sayfa yüklendiğinde wishlist'i al
  }, [getWishlist]);

  if (!wishlist.length) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className=" md:mx-auto font-nunito w-full my-10">
    <div className="container  max-w-[1150px]  mx-auto  gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((product) => (
          <SingleProduct 
          key={product.productId}
          product={product} 
          name={product.name} 
          id={product._id} 
          productPic={product.productPic}
          price={product.price}/>
        ))}
      </div>
    </div>
  );
};

export default WishlistProducts;
