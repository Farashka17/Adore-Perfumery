import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5'>
         <img src={"https://adorebeauty.az/assets/img/logo/brand.svg"}/>
        <button className='bg-gray-500 text-white px-5 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar