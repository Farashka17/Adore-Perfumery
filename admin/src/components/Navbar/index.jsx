import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5'>
      <Link to={"http://localhost:5174"}  rel="noopener noreferrer">
      <img src={"https://adorebeauty.az/assets/img/logo/brand.svg"}/>
      </Link>    
        <button className='bg-gray-500 text-white px-5 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar