import React from 'react';
import BigPerfume from '../../../assets/BigPerfume.svg';
import { CiHeart } from "react-icons/ci";
import Slider from 'react-slick';

const Product = () => {
  // const settings = {
  //   dots: true,
  //   dotsClass: "slick-dots flex justify-center", // Noktaları ortalamak için flex kullanın
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className="bg-white md:mx-auto font-nunito ">
      <div className="container max-w-[1920px] flex flex-col md:flex-row gap-10 justify-center mx-auto md:px-10 py-6 ">
        <div className="container mx-auto ">
              <div className='w-full h-auto '>
                <img src={BigPerfume} alt="Perfume" className="w-full h-auto " />
              </div>
              {/* <div>
                <img src={BigPerfume} alt="Perfume" className="w-full h-auto" />
              </div> */}
          {/* <div className="md:hidden max-w-[390px]  ">
            <Slider {...settings}>
              <div>
                <img src={BigPerfume} alt="Perfume" className="w-full h-auto " />
              </div>
              <div>
                <img src={BigPerfume} alt="Perfume" className="w-full h-auto " />
              </div>
            </Slider>
          </div> */}
        </div>
        <div className='w-[90%] mx-auto'>
          <div>
            <p className='text-[35px] font-raleway'>Chanel</p>
          </div>
          <div className='w-full h-[2px] bg-[#dbaf77]'></div>
          <div className='mt-5'>
            <p className='text-[28px] font-raleway'>Chanel N5 Perfume</p>
          </div>
          <div className='mt-5'>
            <p className='text-[20px] font-raleway'>Eau de Parfum</p>
          </div>
          <div className='mt-5 flex flex-col gap-5'>
            <p>Sizes</p>
            <div className='flex gap-2 items-center'>
              <button className='px-5 py-4 border border-[#232323] hover:bg-[#eaeaea]'>1 OZ / 30 ML</button>
              <button className='px-5 py-4 border border-[#232323] hover:bg-[#eaeaea]'>1.6 OZ / 50 ML</button>
              <button className='px-5 py-4 border border-[#232323] hover:bg-[#eaeaea]'>3 OZ / 90 ML</button>
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-[28px] font-raleway'>Price: $150</p>
          </div>
          <div className='flex w-full gap-3 mt-4'>
            <button className='px-3 border border-[#232323] hover:bg-[#eaeaea] flex items-center justify-center'>
              <CiHeart className='w-8 h-8 hover:text-[#dbaf77]' />
            </button>
            <button className='py-4 border border-[#232323] bg-black text-white hover:bg-[#dbaf77] w-full'>Add to Cart</button>
          </div>
        </div>
      
    </div>
    </div>

  );
}

export default Product;
