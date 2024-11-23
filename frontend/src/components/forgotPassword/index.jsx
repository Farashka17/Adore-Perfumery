import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBackground from '../../assets/LoginBackground.jpg';
import GirlChanel from '../../assets/GirlChanel.jpg';
import { toast } from 'react-toastify';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      console.log(data); 
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the reset link.");
    }
  };
  

  return (
    <div className="relative h-screen md:h-[130vh] lg:h-[130vh] flex items-center justify-center mx-auto">
      <img src={LoginBackground} alt="Background" className="inset-0 w-full h-full object-cover opacity-50" />
      <div className="z-1 absolute top-[20px] bg-white flex md:flex-row flex-col items-center justify-center w-[90%] md:w-[1000px]">
        <div className="flex gap-[40px] items-center justify-center p-8">
          <div className="md:w-[full] md:h-[100%] hidden md:block">
            <img src={GirlChanel} className="bg-cover" alt="Forgot Password Illustration" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="font-dancing text-[50px] hover:text-[#dbaf77]">Forgot Password</p>
            </div>
            <form className="flex flex-col md:w-[480px] w-full" onSubmit={handleForgotPassword}>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#0E1422] py-3 px-6 w-full justify-center items-center gap-[6px] text-[#FFFFFF] text-[14px] hover:bg-[#dbaf77] font-medium rounded-[4px] flex"
              >
                Send Reset Link
              </button>
              <Link
                to={"/login"}
                className="text-[14px] font-normal text-[#5C5F6A] mt-6 text-center hover:text-[#dbaf77]">
                Remembered your password? Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
