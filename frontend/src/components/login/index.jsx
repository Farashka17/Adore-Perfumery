import React from 'react'
import LoginBackground from '../../assets/LoginBackground.jpg'
import GirlChanel from '../../assets/GirlChanel.jpg';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="relative  flex items-center justify-center mx-auto">
    <img src={LoginBackground} alt="Background" className=" inset-0 w-full h-full object-cover opacity-50" />
    <div className="z-1 absolute top-[20px]  bg-white flex md:flex-row flex-col items-center justify-center w-[90%]  md:w-[1000px] ">
       
    <div className='flex gap-[40px] items-center justify-center p-8'>
        <div className='md:w-[full] md:h-[100%] hidden md:block'>
        <img src={GirlChanel} className='bg-cover'/>
        </div>
<div className="flex flex-col items-center justify-center  ">
    <div>
        <p className='font-dancing text-[50px] hover:text-[#dbaf77]'>Login</p>
    </div>

  <form className="flex flex-col md:w-[480px] w-full" >   

    <input
      type="email"
      id="email"
    placeholder='Email'
      className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
    />

    <input
      type="password"
      id="password"
      placeholder='Password'
      className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
    />

    <Link
      to={"#"}
      className="text-[12px] text-[#474B57] font-medium text-end mb-6 hover:text-[#dbaf77]"
    >
      Forgot Password?
    </Link>

    <div>
      <button className="bg-[#0E1422] py-3 px-6 w-full justify-center items-center gap-[6px] text-[#FFFFFF] text-[14px] hover:bg-[#dbaf77] font-medium rounded-[4px] flex ">
        Login
      </button>
    </div>

    <Link
      to={"/register"}
      className="text-[14px] font-normal text-[#5C5F6A] mt-6 text-center hover:text-[#dbaf77]"
    >
      Don't have an account? Sign up
    </Link>
  </form>
</div>
</div>

  </div>
  </div>


  )
}

export default Login


