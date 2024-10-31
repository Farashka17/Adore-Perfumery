import React from 'react'
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { TbShoppingBagCheck } from "react-icons/tb";

const BottomHeader = () => {

    const navElements = [
        { title: "SHOP", href: "/eveningBags" },
        { title: "SKINCARE", href: "/shoulderBag" },
        { title: "Backpack", href: "/backpack" },
        { title: "Handbag", href: "/handbag" },
        { title: "Postman bag", href: "/postmanBag" },
        { title: "Belt bags", href: "/beltBags" },
      ];
  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1920px]  flex justify-between items-center mx-auto md:px-10 py-[25px] px-[15px]">
     <Link to={"/"}>  <div>
            <img src={"https://adorebeauty.az/assets/img/logo/brand.svg"}/>
         </div>
         </Link>  
         <div className='lg:flex lg:gap-6  hidden'>
         <Link to={'/products'}>  <button className='hover:text-[#dbaf77]'>Products</button></Link> 
            <button className='hover:text-[#dbaf77]'>Collection</button>
            <button className='hover:text-[#dbaf77]'>Our History</button>
            <button className='hover:text-[#dbaf77]'>Contact</button>
         </div>
         <div className='flex iterms-center gap-[30px]'>
       <Link to={"/login"}> <button className='md:block hidden '><HiOutlineUser  className='w-[23px] h-[23px]'/></button></Link> 
       <Link to={"/account"}> <button className='md:block hidden '><TbShoppingBagCheck  className='w-[23px] h-[23px]'/></button></Link> 

       <Link to={"/wishlist"}>      <button className='md:block hidden'><GoHeart className='w-[23px] h-[23px]'/></button></Link> 
            <button className='relative md:flex hidden'>
       <Link to={"/cart"} ><HiOutlineShoppingBag className='w-[23px] h-[23px]'/>
              <div className='w-[20px] h-[20px] rounded-full bg-[#c19c60] flex items-center justify-center absolute text-[11px] text-white top-[10px] right-[10px]'>0</div></Link> 
            </button>
            <button className='md:block hidden '><IoSearchOutline className='w-[23px] h-[23px]'/></button>
          <button className='lg:hidden md:block'><GiHamburgerMenu className='w-[23px] h-[23px]'/></button>

         </div>
        
    </div>
  </div>
  )
}

export default BottomHeader
































  {/* <div className="flex items-center mx-auto gap-[53px] bg-green-800">
          <ul className="flex items-start justify-between  w-[1128px]">
          {
            navElements.map((navElement ,index) => (
             <button key={index}><li key={index}  className="text-[#273142] text-[16px] font-normal w-[122px]">
               {navElement.title}
              </li></button> 
            ))}
            </ul>
        </div> */} 