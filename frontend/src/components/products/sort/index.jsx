import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Filter from "../filter";
import { IoColorFilterOutline } from "react-icons/io5";
const Sort = () => {
  const [isVisible, setIsVisible] = useState(true); // Durum değişkenini burada tanımlayın

  const toggleFilter = () => {
    setIsVisible((prev) => !prev); // Durum değişkenini tersine çevirin
  };

  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
      <div className=" hidden container max-w-[1150px] items-center justify-between md:flex mx-auto px-5 ">
        <div>
          <p className="text-[#232323] font-semibold text-[16px] font-raleway ">
            Showing 1-9 of 26 results
          </p>
        </div>
        <div>
          <select className="border-b border-b-black border-opacity-50 p-2 w-[200px] text-[#232323]">
            <option value="name">Sort by name</option>
            <option value="price">Sort by price:Low to high</option>
            <option value="price">Sort by price:High to low</option>
          </select>
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search products"
              className="border-b border-b-black border-opacity-50 py-2"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-center md:hidden">
        <button className="w-[35px] h-[35px]" onClick={toggleFilter}>
          <CiFilter className="w-[30px] h-[30px]" />
        </button>
        <button className="w-[35px] h-[35px]" onClick={toggleFilter}>
          <IoColorFilterOutline className="w-[30px] h-[30px]" />
        </button>
      </div>

      {isVisible && (
        <div className="  md:hidden absolute top-0 left-0 z-10">
          {" "}
          {/* absolute ve z-index ekledik */}
          <Filter />
        </div>
      )}
    </div>
  );
};

export default Sort;
