import React from 'react'
import { HiOutlinePhone } from 'react-icons/hi2'
import { TfiEmail } from 'react-icons/tfi'
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="bg-[black]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1120px]  flex justify-between items-center mx-auto md:px-10 py-[25px] px-[15px]">
       <div className='flex flex-col items-start justify-start gap-3'>           
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
      <div className='flex gap-4'>
        <div><FaFacebookF className='text-white w-[20px] h-[20px]' /></div>
        <div><FaInstagram className='text-white w-[20px] h-[20px]' /></div>
        <div><FaLinkedin className='text-white  w-[20px] h-[20px]'  /></div>



      </div>
       </div>


       
    </div>
    </div>

  )
}

export default Footer