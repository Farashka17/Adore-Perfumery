import React from "react";
import HorizontalLine from "../../../../assets/HorizontalLine.jpg";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi2";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const UpperHeader = () => {
  return (
    <div className="md:bg-[black] mx-auto md:block hidden font-nunito ">
      <div className="container max-w-[1920px]  flex justify-between items-center mx-auto px-10 py-[5px]">
        {/* sol */}
        <div className="lg:flex lg:items-center gap-4 md:flex-wrap">
        <div className=" flex gap-4 items-center">
          <p className="text-white font-extralight text-[16px] ">Terms of Use</p>
          <div className="w-4 h-[1px]">
            <img src={HorizontalLine} />
          </div>
          <p className="text-white font-extralight text-[16px] ">New Arrivals</p>
          <div className="w-4 h-[1px]">
            <img src={HorizontalLine} />
          </div>
          </div>

         <div > <p className="text-white font-extralight text-[16px]">Delivery</p></div>
        </div>
        {/* sag */}
        <div className="lg:flex lg:items-center lg:gap-[60px] md:flex-wrap ">
            <div className="flex gap-4 items-center">
          <div className="flex items-center gap-[11px]">
            <TfiEmail className="text-white" />
            <p className="text-white font-extralight text-[16px]">
            contact@adoregroup.az
            </p>
          </div>
          <div className="w-4 h-[1px]">
            <img src={HorizontalLine} />
          </div>
          <div className="flex items-center gap-[11px]">
          <HiOutlinePhone className="text-white" />
            <p className="text-white font-extralight text-[16px]">
            970
            </p>
          </div>
         </div>
          <div className="flex items-center gap-[26px] md:justify-end md:mt-1">
          <FaTwitter className="text-white font-extralight text-[16px]" />
          <FaFacebookF className="text-white font-extralight text-[16px]" />
          <FaLinkedinIn className="text-white font-extralight text-[16px]" />
          <FaInstagram  className="text-white font-extralight text-[16px]"/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpperHeader;
