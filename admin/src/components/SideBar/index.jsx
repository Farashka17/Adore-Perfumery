import React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { LuShoppingBag } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to={"/products"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l '>
            <AiFillProduct className='w-5 h-5' />
            <p className='hidden md:block'>Products</p>
          </div>
        </NavLink>

        <NavLink to={"/brand"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l '>
            <MdCategory className='w-5 h-5' />
            <p className='hidden md:block'>Brands</p>
          </div>
        </NavLink>

        <NavLink to={"/fragranceFamily"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l '>
            <MdCategory className='w-5 h-5' />
            <p className='hidden md:block'>Fragrance Family</p>
          </div>
        </NavLink>

        <NavLink to={"/concentration"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l '>
            <MdCategory className='w-5 h-5' />
            <p className='hidden md:block'>Concentration</p>
          </div>
        </NavLink>

        <NavLink to={"/list"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l '>
            <CiViewList className='w-5 h-5' />
            <p className='hidden md:block'>List items</p>
          </div>
        </NavLink>

        <NavLink to={"/orders"}>
          <div className='flex items-center border gap-2 border-gray-300 border-r-0 px-3 py-2 rounded-l'>
            <LuShoppingBag className='w-5 h-5' />
            <p className='hidden md:block'>Orders</p>
          </div>
        </NavLink>
        
      </div>
    </div>
  );
}

export default Sidebar;
