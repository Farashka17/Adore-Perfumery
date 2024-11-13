import React from 'react'
import Filter from './filter'
import VisibleProducts from './visibleProducts'
import Sort from './sort'


const Products = () => {
  return (
    <div className=" md:mx-auto font-nunito w-full">
    <div className="container  max-w-[1150px]  flex flex-col  mx-auto  gap-6">
      <Sort/>
    <div className="container max-w-[1150px]  flex md:gap-[50px] lg:gap-[70px] mx-auto  ">

         <VisibleProducts /> 
         <Filter />
    </div>
      
    </div>
    </div>

  )
}

export default Products