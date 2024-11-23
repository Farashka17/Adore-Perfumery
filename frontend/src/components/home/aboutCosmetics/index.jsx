import React, { useEffect } from 'react'
import { useState } from 'react';
import Leaf from '../../../assets/Leaf.svg'

const AboutCosmetics = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < 470) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount; 
        }
      });
      
    }, 10); 

   
    return () => clearInterval(interval);
  }, []);


  const [years, setYears] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setYears(prevYears => {
        if (prevYears < 24) {
          return prevYears + 1;
        } else {
          clearInterval(interval);
          return prevYears; 
        }
      });
    }, 100); 

   
    return () => clearInterval(interval);
  }, []);

 
  return (
    <div className="mx-auto mt-[100px]">
      <div className="container max-w-[1120px] mx-auto my-[60px] flex flex-col md:flex-row md:items-start items-center justify-center md:justify-between" >
          {/* sol */}
          <div >
            <p className='font-dancing text-[42px] text-center md:text-start'>About Cosmecos</p>
            <p className='text-[32px] text-[#232323] font-raleway font-thin text-center md:text-start'>Perfect Perfume</p>
            <p className='font-extralight font-nunito text-[16px] mt-[14px] text-[#232323] text-center md:text-start'>Popularized through customer relationships with some of the world’s most recognizable faces.</p>
            <p className='font-extralight font-nunito text-[16px] mt-[29px] text-[#232323] text-center md:text-start'>Merluccid hake redlip blenny discus snake mudhead large-eye bream scissor-tail rasbora opaleye char dogfish beachsalmon, sand tilefish. Spiny eel skipping goby fierasfer tarwhine Blind goby tidewater goby rocket danio armorhead catfish streamer.</p>
           <div className='flex justify-between items-center mt-7 '>
            <div>
              <p className='font-raleway font-thin text-[40px] lg:text-[48px]'> {count}K</p>
            </div>
            <div>
               <p className='font-raleway font-thin text-[40px] lg:text-[48px]'> {years} years</p>
            </div>
          </div>
             <div className='flex items-center justify-center md:justify-start'>
            <button className='font-raleway text-[13px] font-thin py-5 px-10 border border-black mt-10 '>Explore More</button>
          </div>
          </div>
 
          {/* sag */}
          <div className='md:ml-10 mt-5 md:mt-0'>
          <div >
          <iframe
    className="w-[390px] h-[315px] md:w-[460px] lg:2-[560px]"
    src="https://www.youtube.com/embed/ht3jGAVTrVk?autoplay=1&controls=0&mute=1"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
          </div>
          <p className='text-[157px] text-[#ffa16a] hidden md:block'>new</p>
          </div>
      {/* yan */}
      <div className='hidden lg:block'>
        <img src={Leaf} className='w-[570px] h-[284px]'/>
      </div>
    </div>
    </div>

  )
}

export default AboutCosmetics