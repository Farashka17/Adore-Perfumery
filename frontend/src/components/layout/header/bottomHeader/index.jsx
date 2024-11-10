import React, { useState, useEffect } from 'react';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi2";
import { Link,  useNavigate } from 'react-router-dom';

const BottomHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
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
       console.log(role)
    };
 
    checkUserStatus();

    // Login durumunu dinleyin
    window.addEventListener('loginStatusChanged', checkUserStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkUserStatus);
    };
  }, []);
  // const handleAdminDashboardClick = () => {
  //   if (userRole === 'admin') {
  //     navigate('/admin');
  //   }
  // };
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    window.dispatchEvent(new Event('loginStatusChanged'));
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
              <button className="text-black flex items-center gap-2">
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
              <a href="http://localhost:5173"  rel="noopener noreferrer">
                Admin Dashboard
              </a>
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

          <Link to={"/wishlist"}>
            <button className='md:block hidden'>
              <GoHeart className='w-[23px] h-[23px]' />
            </button>
          </Link>

          <button className='relative md:flex hidden'>
            <Link to={"/cart"}>
              <HiOutlineShoppingBag className='w-[23px] h-[23px]' />
              <div className='w-[20px] h-[20px] rounded-full bg-[#c19c60] flex items-center justify-center absolute text-[11px] text-white top-[10px] right-[10px]'>0</div>
            </Link>
          </button>

          <button className='md:block hidden'>
            <IoSearchOutline className='w-[23px] h-[23px]' />
          </button>

          <button className='lg:hidden md:block'>
            <GiHamburgerMenu className='w-[23px] h-[23px]' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
