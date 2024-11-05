import React from 'react'
import SingleProduct from '../../common/singleProduct'
import Pagination from '../pagination'

const VisibleProducts = () => {
  return (
    <div>
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-[30px] mx-auto py-4'>
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
    <div>
      <Pagination/>
    </div>
    </div>
  )
}

export default VisibleProducts