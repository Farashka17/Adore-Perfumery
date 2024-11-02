import React from 'react'
import Shape from '../../../assets/Shape.svg'
const Contact = () => {
  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1420px]  flex flex-col  justify-between  mx-auto md:px-10 py-[25px] px-[15px]">
        <div>
          <p className='font-dancing text-[45px]'>Contact with us</p>
        </div>
        <div className=' bg-red-300'>
            <div className='relative bg-yellow-300'>
                {/* <img src={Shape}/> */}
                <p>546845288 cotact</p>
            </div>
           
        </div>
        </div>
        </div>
  )
}

export default Contact