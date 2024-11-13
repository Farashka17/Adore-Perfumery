import React from 'react'
import { SiTicktick } from "react-icons/si";

const Description = ({product}) => {
  if (!product) return <p>Loading...</p>;
  return (
      // <div className=" mt-5 bg-red-500 w-[370px] md:w-[750px]  ">
        <div className="bg-white font-nunito ">
      <div className="container    max-w-[1120px]   ">
        
          <p className='text-[#616161] text-[16px] font-nunito'>{product.description}</p>
              
        
        {/* <div className='mt-5 flex flex-col gap-2'>
            <div className='flex gap-2 items-center'> <SiTicktick  className='text-yellow-500 w-[20px] h-[20px]'/> <p className='text-[16px] font-nunito text-[#616161]'>Frilled shark ground shark livebearer cutthroat trout</p></div>
            <div className='flex gap-2 items-center'> <SiTicktick  className='text-yellow-500 w-[20px] h-[20px]'/> <p className='text-[16px] font-nunito text-[#616161]'>Frilled shark ground shark livebearer cutthroat trout</p></div>
            <div className='flex gap-2 items-center'> <SiTicktick  className='text-yellow-500 w-[20px] h-[20px]'/> <p className='text-[16px] font-nunito text-[#616161]'>Frilled shark ground shark livebearer cutthroat trout</p></div>
        </div> */}
    </div>
    </div>

 

  )
}

export default Description