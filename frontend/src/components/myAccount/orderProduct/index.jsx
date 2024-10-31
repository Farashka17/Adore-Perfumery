import React from 'react'
import Perfume from '../../../assets/Perfume.svg'


const SingleOrderProduct = () => {
  return (
    <div className="flex gap-12 items-center  bg-[#f7f7f6] px-5 py-3">
    
       <p className="flex flex-col font-raleway">
            Name:
            <span>Chanel N5 Perfume</span>
          </p>
          <p className="flex flex-col font-raleway">
            Price:
            <span>$100</span>
          </p>
          <div className='w-[111px] h-[111px] '>
      <img src={Perfume} className='bg-cover  w-[100%] h-[111px]'/>
     </div>
    </div>
  )
}

export default SingleOrderProduct