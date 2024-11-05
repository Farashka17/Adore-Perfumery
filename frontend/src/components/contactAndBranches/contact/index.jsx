import React from 'react'
import Shape from '../../../assets/Shape.svg'
import { BsTelephone } from "react-icons/bs";
import ContactBackground from '../../../assets/ContactBackground.svg'
import MailBackground from '../../../assets/MailBackground.svg'
import ContactShape from '../../../assets/ContactShape.svg'
import MailShape from '../../../assets/MailShape.svg'
import ContactIcon from '../../../assets/ContactIcon.svg'
import MailIcon from '../../../assets/MailIcon.svg'

import { BsWhatsapp } from "react-icons/bs";

import { MdMailOutline } from "react-icons/md";


const Contact = () => {
  return (

    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1420px]  flex flex-col items-center justify-center gap-14 mx-auto md:px-10 py-[25px] px-[15px]">
      <p className='font-dancing text-[48px]'>Contact with us</p>
      <div className=' flex flex-col md:flex-row  justify-center gap-14 mx-auto'>
        {/* 1ci */}
        <div className='  flex flex-col md:flex-row items-center gap-5 py-2'>
         <div className='relative'>
          <img src={ContactBackground}/>
          <img src={ContactShape} className='absolute top-7 left-7'/>
          <img src={ContactIcon} className='absolute top-[80px] left-[70px]'/>
         </div>
         <div className='flex flex-col gap-1'>
        
         <div className='flex items-center gap-2'>
         <BsTelephone className='text-[20px] text-[#c2975d]'/>
         <p className='font-nunito text-[18px]'>970</p>
         </div>
         <div className='flex items-center gap-2'>
         <BsWhatsapp className='text-[20px] text-[#c2975d]'/>
         <p className='font-nunito text-[18px]'>+994502879970</p>
         </div>
         </div>  
        </div>
       {/* 2ci */}
       <div className='  flex flex-col md:flex-row  items-center  py-2'>
         <div className='relative'>
          <img src={ContactBackground}/>
          <img src={MailShape} className='absolute top-7 left-7'/>
          <img src={MailIcon} className='absolute top-[80px] left-[70px]'/>
         </div>
         <div className='flex flex-col gap-1'>
        
         <div className='flex items-center gap-2'>
         <MdMailOutline className='text-[20px] text-[#c2975d]'/>
         <p className='font-nunito text-[18px]'>contact@adoregroup.az</p>
         </div>
         
         </div>  
        </div>
        </div>
        </div>
        </div>
  )
}

export default Contact