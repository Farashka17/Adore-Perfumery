import React, { useState, useEffect } from 'react';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore } from '../../../../store/useCartStore';

const BottomHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [cartCount, setCartCount] = useState(0); // Sepetteki ürün sayısını takip eden state
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('userName');
      const role = localStorage.getItem('role');
      if (user) {
        setUserName(user);
        setIsLoggedIn(true);
        setUserRole(role);
      } else {
        setUserName('');
        setIsLoggedIn(false);
        setUserRole('');
      }
    };

    checkUserStatus();

    // Sepetteki ürün sayısını yerel depolamadan veya API'den al
    const storedCartCount = localStorage.getItem('cartCount');
    setCartCount(storedCartCount ? parseInt(storedCartCount, 10) : 0);

    window.addEventListener('loginStatusChanged', checkUserStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkUserStatus);
    };
  }, []);

  const { cart, getCart, clearCart } = useCartStore();

  // const getCart = useCartStore.getState().getCart;
    getCart();
  // Toplam ürün miktarını hesaplayan fonksiyon
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    // Component yüklendiğinde sepeti getirme işlemi
    getCart();
  }, []);

  const handleLogout = () => {
    clearCart();
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    window.dispatchEvent(new Event('loginStatusChanged'));
  };

  const toggleMobileMenu = () => {
    setIsMobile((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUser((prev) => !prev);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add something to cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } else {
      navigate('/cart');
    }
  };

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add something to wishlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } else {
      navigate('/wishlist');
    }
  };

  // Sepete ürün ekleyen bir fonksiyon (örnek olarak)
  const addToCart = () => {
    const newCartCount = cartCount + 1; // Yeni değeri hesapla
    setCartCount(newCartCount); // Yeni değeri state'e uygula
    localStorage.setItem('cartCount', newCartCount); // Yeni değeri localStorage'a kaydet
  };

  return (
    <div className="bg-[white] md:mx-auto font-nunito w-full">
      <div className="container max-w-[1920px] flex justify-between items-center mx-auto md:px-10 py-[25px] px-[15px]">
        <Link to={"/"}>
          <div>
            <img src={"https://adorebeauty.az/assets/img/logo/brand.svg"} alt="Brand Logo" />
          </div>
        </Link>
        <div className='lg:flex lg:gap-6 hidden'>
          <Link to={'/products'}>
            <button className='hover:text-[#dbaf77]'>Products</button>
          </Link>
          <button className='hover:text-[#dbaf77]'>Collection</button>
          <button className='hover:text-[#dbaf77]'>Our History</button>
          <Link to={"/contactAndBranches"}>
            <button className='hover:text-[#dbaf77]'>Contact</button>
          </Link>
        </div>
        <div className='flex items-center gap-[30px]'>
          <div className="relative">
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="text-black flex items-center gap-2" onClick={toggleUserMenu}>
                {isLoggedIn && (
                  <span className="ml-2 text-black">Hello, {userName}</span>
                )}
                <HiOutlineUser className="w-6 h-6" />
              </button>
           
              {isOpen && (
                <div className="absolute top-full right-0 z-10 rounded-lg shadow w-32 bg-white">
                  <div className="py-2 px-1 flex flex-col gap-1 text-sm text-gray-950 text-left ">
                    {isLoggedIn ? (
                      <>
                        <button 
                          onClick={handleLogout} 
                          className="block px-2 py-1 rounded hover:bg-slate-100 text-left"
                        >
                          Logout
                        </button>
                        <Link
                          to="/account"
                          className="block px-2 py-1 rounded hover:bg-slate-100"
                        >
                          My Account
                        </Link>
                        {userRole === 'admin' && (
                          <Link to={"http://localhost:5173"}  rel="noopener noreferrer">
                            Admin Dashboard
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link 
                        to="/login" 
                        className="block px-2 py-1 rounded hover:bg-slate-100"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className='relative md:flex hidden' onClick={handleWishlistClick}>
            <GoHeart className='w-[23px] h-[23px]' />
          </button>
          <button className='relative md:flex hidden' onClick={handleCartClick}>
            <HiOutlineShoppingBag className='w-[23px] h-[23px]' />
            {getTotalQuantity() > 0 && (
             <div className='w-[20px] h-[20px] rounded-full bg-[#c19c60] flex items-center justify-center absolute text-[11px] text-white top-[10px] right-[10px]'>
               {getTotalQuantity()}
            </div>
          )}

          </button>
          <button className='md:block hidden'>
            <IoSearchOutline className='w-[23px] h-[23px]' />
          </button>
          <button className='lg:hidden md:block' onClick={toggleMobileMenu}>
            <GiHamburgerMenu className='w-[23px] h-[23px]' />
          </button>
          {isMobile && (
            <div className="absolute top-6 right-0 z-20 bg-white flex flex-col items-start p-5 shadow-md">
              <button onClick={toggleMobileMenu} className="self-end mb-4 text-gray-700">
                Close
              </button>
              <Link to="/products"><button className="text-black py-2 hover:text-[#dbaf77]">Products</button></Link>
            <button className="text-black py-2 hover:text-[#dbaf77]"  onClick={handleCartClick}>Cart</button>
              <button className="text-black py-2 hover:text-[#dbaf77]"  onClick={handleWishlistClick}> Wishlist</button>
              <Link to="/contactAndBranches"><button className="text-black py-2 hover:text-[#dbaf77]">Contact</button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
