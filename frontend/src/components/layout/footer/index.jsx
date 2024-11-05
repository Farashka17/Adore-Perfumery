import React from 'react'
import { HiOutlinePhone } from 'react-icons/hi2'
import { TfiEmail } from 'react-icons/tfi'
import { FaFacebookF, FaGooglePlay, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { GrAppleAppStore } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Footer = () => {
  // const company = [
  //   { title: "About Us", href: "/aboutUs" },
  //   { title: "Contact", href: "/contact" },
  //   { title: "Terms of Use", href: "/termsOfUse" },
  //   { title: "Customer Service", href: "/customerService"}
  // ];
  // const help = [
  //   { title: "FAQ", href: "/faq" },
  //   { title: "Delivery", href: "/delivery" },
  //   { title: "Cancellation of the order", href: "/cancellationOfTheOrder" },
  //   { title: "Don't go back", href: "/dontGoBack" },
  // ];
  return (
    <div className="bg-[black]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1120px]  flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mx-auto md:px-10 py-[25px] px-[15px]">
       <div className='flex flex-col items-start justify-start gap-3 w-[350px]'>           
       <div><img src={"https://adorebeauty.az/assets/img/logo/brand.svg"}/></div> 
       <div className="flex items-center gap-[11px]">
          <HiOutlinePhone className="text-white" />
            <p className="text-white font-extralight text-[16px]">
            970
            </p>
       </div> 
       <div className="flex items-center gap-[11px]">
            <TfiEmail className="text-white" />
            <p className="text-white font-extralight text-[16px]">
            contact@adoregroup.az
            </p>
      </div>
      <div className="flex items-center gap-[11px]">
         
            <p className="text-white font-raleway font-extralight text-[16px]">
            Adore Perfumery is a leading fragrance retailer in Azerbaijan, offering a wide selection of authentic, high-quality perfumes. It features collections from both local and international brands.
            </p>
      </div> 
     
      <div className='flex gap-4'>
        <div><FaFacebookF className='text-white w-[20px] h-[20px]' /></div>
        <div><FaInstagram className='text-white w-[20px] h-[20px]' /></div>
        <div><FaLinkedin className='text-white  w-[20px] h-[20px]'  /></div>
      </div>
       </div>

       <div className="flex flex-col items-start justify-start  gap-[20px]">
          <p className='font-medium text-[18px] text-white font-raleway'>Company</p>
          <ul className="flex flex-col gap-[20px] items-start text-white ">
         <li> About Us</li>
         <li> Brands</li>
       <Link to={"/contactAndBranches"}><li> Contact</li></Link>  
       <Link to={"/contactAndBranches"}>  <li> Branches</li></Link>

            </ul>
        </div>

        <div className="flex flex-col gap-[20px] w-[350px]">
          <p className='font-medium text-[18px] text-white'>You can download our app from App Store and Google Play.</p>
          <ul className="flex gap-[20px] items-start text-white ">
         <li> <GrAppleAppStore  className='text-white w-[20px] h-[20px]' /></li>
         <li><FaGooglePlay className='text-white w-[20px] h-[20px]'/></li>
        

            </ul>
        </div>

       
    </div>
    </div>

  )
}

export default Footer