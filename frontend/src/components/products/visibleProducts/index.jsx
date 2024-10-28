import React from 'react'
import SingleProduct from '../../common/singleProduct'

const VisibleProducts = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-[30px] mx-auto'>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>
      <SingleProduct/>

    </div>
  )
}

export default VisibleProducts