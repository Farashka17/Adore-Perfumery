import React from 'react'
import Fresh from '../../../assets/Fresh.svg'
const Category = () => {
  return (
    <div className=" mx-auto ">
      <div className="container max-w-[1120px] mx-auto my-[60px]" >
       <div className=' flex flex-col items-center justify-center text-center'>
        <p className='text-[#000] text-[52px] font-dancing font-regular'>Category</p>
        <p className='font-raleway font-thin text-[38px] text-[#232323] leading-[56px]'>Fragrance Types</p>
        <p className='text-[#9A9A9A] font-nunito font-extralight text-[18px] mt-[10px]'>The stylish and organized cosmetic products</p>
       </div>
       <div className='flex gap-[50px] mx-auto  flex-col md:flex-row text-center mt-12'>
        <div className='flex flex-col items-center justify-center '>
            <img src={Fresh} />
            <p className='text-[30px] font-thin font-dancing text-[#232323] mt-[33px]'>Fresh Fragrances</p>
            <p className='text-[16px] font-nunito font-extralight text-[#232323] mt-5'>Black scalyfin kingfish convict blenny ziege yellow moray whalefish silver drifitinity elpo</p>
        </div>

        <div className='flex flex-col items-center justify-center'>
            <img src={Fresh} />
            <p className='text-[30px] font-thin font-dancing text-[#232323] mt-[33px]'>Fresh Fragrances</p>
            <p className='text-[16px] font-nunito font-extralight text-[#232323] mt-5'>Black scalyfin kingfish convict blenny ziege yellow moray whalefish silver drifitinity elpo</p>
        </div>

        <div className='flex flex-col items-center justify-center'>
            <img src={Fresh} />
            <p className='text-[30px] font-thin font-dancing text-[#232323] mt-[33px]'>Fresh Fragrances</p>
            <p className='text-[16px] font-nunito font-extralight text-[#232323] mt-5'>Black scalyfin kingfish convict blenny ziege yellow moray whalefish silver drifitinity elpo</p>
        </div>

        <div className='flex flex-col items-center justify-center'>
            <img src={Fresh} />
            <p className='text-[30px] font-thin font-dancing text-[#232323] mt-[33px]'>Fresh Fragrances</p>
            <p className='text-[16px] font-nunito font-extralight text-[#232323] mt-5'>Black scalyfin kingfish convict blenny ziege yellow moray whalefish silver drifitinity elpo</p>
        </div>
       </div>
    
    </div>
    </div>

  )
}

export default Category