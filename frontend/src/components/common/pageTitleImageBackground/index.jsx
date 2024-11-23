import React from 'react';
import TitleBackground from '../../../assets/TitleBackground.jpg';

const PageTitleImageBackground = ({ title }) => { 
  return (
    <div className='w-full mx-auto'>
    <div className=" container max-w-[1920px] relative w-full h-auto mx-auto  items-center">
      <img src={TitleBackground} alt="Background" className=" relative inset-0 w-full h-auto object-cover" />
      <div className="z-10 absolute md:top-[100px] md:left-[70px] lg:top-[170px] lg:left-[120px] top-[30px] left-[0px] text-start">
        {/* <div><p className='font-dancing lg:text-[45px] md:text-[35px] text-[20px]'>Perfumes and Cosmetics</p></div> */}
        <div><p className='font-dancing text-[20px] lg:text-[55px] md:text-[40px] font-extralight'>{title}</p></div>
      </div>
    </div>
    </div>
  );
}

export default PageTitleImageBackground;