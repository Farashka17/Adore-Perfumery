import React from 'react'
import NewSingleProduct from '../../common/newSingleProduct'
import SolYarpaq from '../../../assets/SolYarpaq.svg'
import BigPerfume from '../../../assets/BigPerfume.svg'
import SagYarpaq from '../../../assets/SagYarpaq.svg'

const NewProducts = () => {
  return (
  <div>
  <div className='container max-w-[1920px] mx-auto my-8'>
    <div className=' flex flex-col items-center  mt-[80px]'>
      <p className='font-dancing font-regular  text-[50px]'>New Products</p>
        <p className='font-raleway font-thin text-[38px] text-[#232323]'>Meet New Arrivals</p>
    </div>
    <div className='flex md:items-end items-center justify-center mt-10 md:justify-between mx-auto'>
      <div className='hidden lg:block '><img src={SolYarpaq}/></div>
      <div className='flex flex-col md:flex-row gap-[50px] '>
      <div className='grid gird-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[50px]'>
        <NewSingleProduct/>
        <NewSingleProduct/>
        <NewSingleProduct/>
        <NewSingleProduct/>
        <NewSingleProduct/>
        <NewSingleProduct/>
      </div>
      <div className=''>
        <img src={BigPerfume}/>
      </div>

      </div>
      <div className='hidden lg:block'><img src={SagYarpaq}/></div>
    </div>
    
    </div>
    </div>
  )
}

export default NewProducts