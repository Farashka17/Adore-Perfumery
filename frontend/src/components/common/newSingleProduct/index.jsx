import React from 'react'
import { Link } from 'react-router-dom'

const NewSingleProduct = ({ id, name, price, productPic }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className='bg-green-500 max-w-full sm:max-w-[390px] mx-auto flex items-center gap-[20px] overflow-hidden'>
        <div className='min-w-[135px] h-[159px] bg-[#e9e6ed] flex items-center justify-center'>
          <div className='w-[80%] h-[80%] border border-black transition-transform duration-300 transform hover:scale-125'>
            <img 
              src={productPic} 
              alt={name} 
              className='h-full w-full object-cover' // object-fit: cover kullanıldı
            />
          </div>
        </div>
        <div className=''>
          <p className='font-raleway font-thin text-[18px] text-[#232323] truncate w-[55%] lg:w-[60%]'>
            {name}
          </p>
          <p className='font-nunito text-[14px] font-extralight text-[#969696]'>
            {price}$
          </p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span key={index} className='text-yellow-500'>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NewSingleProduct
