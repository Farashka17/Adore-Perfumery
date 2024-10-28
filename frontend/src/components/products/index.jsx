import React from 'react'
import Filter from './filter'
import VisibleProducts from './visibleProducts'

const Products = () => {
  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="container max-w-[1150px]  flex md:gap-[50px] lg:gap-[70px] mx-auto  px-5">
         <VisibleProducts/> 
         <Filter/>
      
    </div>
    </div>

  )
}

export default Products