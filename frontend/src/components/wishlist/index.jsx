import React, { useEffect } from 'react';
import PageTitleImageBackground from '../common/pageTitleImageBackground';
import WishlistProducts from './wishlistProducts';
import { useWishlistStore } from '../../store/useWishlistStore';

const Wishlist = () => {
  const title = 'My Fragrancy Collection';
  const { wishlist, getWishlist } = useWishlistStore(); // Wishlist store'u
  useEffect(() => {
    getWishlist(); // Sayfa yüklendiğinde wishlist'i al
  }, [getWishlist]);
  if (!wishlist.length) {
    return( <>
     <PageTitleImageBackground title={title}/>
    <div className="my-8 text-center">
    <p className="text-lg font-thin font-raleway">If you haven't added any perfumes yet, explore our collection and start your wishlist!</p>
    <button
      onClick={() => window.location.href = "/products"}
      className="py-2 px-6 border font-raleway bg-[#dbaf77] text-white rounded-lg mt-4"
    >
      Explore More Products
    </button>
  </div>
    </>);
  }
  
  return (
    <div>
      <PageTitleImageBackground title={title}/>
      <WishlistProducts />
      
      {/* Extra Content or Footer */}
    
    </div>
  );
}

export default Wishlist;
