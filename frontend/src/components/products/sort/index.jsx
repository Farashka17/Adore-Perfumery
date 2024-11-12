// Sort.js
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Filter from "../filter";
import { IoSearchOutline } from "react-icons/io5";


const Sort = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);



  const toggleFilter = () => {
    setIsMobileFilterOpen((prev) => !prev);
  };
  const toggleSort = () => {
    setIsMobileSortOpen((prev) => !prev);
  };
  const toggleSearch = () => {
    setIsMobileSearchOpen((prev) => !prev);
  };

  return (
    <div className="md:mx-auto font-nunito w-full">
      {/* Masaüstü görünüm */}
      <div className="hidden container max-w-[1150px] items-center justify-between md:flex mx-auto px-5">
        <div >
          <p className="text-[#232323] font-semibold text-[16px] font-raleway">
            Showing 1-9 of 26 results
          </p>
        </div>
        <div>
          <select className="border-b border-b-black border-opacity-50 p-2 w-[200px] text-[#232323]">
            <option value="name">Sort by name</option>
            <option value="price">Sort by price: Low to high</option>
            <option value="price">Sort by price: High to low</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search products"
            className="border-b border-b-black border-opacity-50 py-2"
          />
        </div>
      </div>

      {/* Mobilde Filtre İkonu */}
      <div className="flex gap-6">
      <button
        className="md:hidden items-center  flex gap-2 ml-2"
        onClick={toggleFilter}
      >
        <div className="bg-[#F0F0F0] rounded-full p-2">
        <CiFilter className="w-[30px] h-[30px]" />  
        </div>
        
        Filter
      </button>
      <button
        className="md:hidden items-center  flex gap-2 ml-2"
        onClick={toggleSort}
      >
           <div isMobileSortOpen={isMobileSortOpen}>
          <select className="border-b border-b-black border-opacity-50 p-2 w-[150px] text-[#232323]">
            <option value="name">Sort by name</option>
            <option value="price">Sort by price: Low to high</option>
            <option value="price">Sort by price: High to low</option>
          </select>
        </div>
      </button>
      <button
        className="md:hidden items-center  flex gap-2 ml-2"
        onClick={toggleSearch}
      >
        <div className="bg-[#F0F0F0] rounded-full p-2">
        <IoSearchOutline className="w-[30px] h-[30px]" />  
        </div>
        
        
      </button>
      </div>
      {/* Mobilde Açılan Filter Bileşeni */}
   {   isMobileFilterOpen &&   <Filter isMobileFilterOpen={isMobileFilterOpen} closeFilter={toggleFilter} />}
                  
{ isMobileSearchOpen &&
   <div isMobileSearchOpen={isMobileSearchOpen}>
          <input
            type="text"
            placeholder="Search products"
            className="border-b border-b-black border-opacity-50 py-2 ml-6"
          />
        </div>
        }
    </div>

  );
};

export default Sort;
