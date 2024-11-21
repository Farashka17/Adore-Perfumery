import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import GirlChanel from '../../assets/GirlChanel.jpg';

import LoginBackground from '../../assets/LoginBackground.jpg'; // Bu dosyayı kendiniz eklemeniz gerekebilir.

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams(); // URL'den token'ı alıyoruz
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password, newPasswordConfirm: confirmPassword }),
      });
      console.log("token:",token)
        const data = await response.json();

        if (response.ok) {
            toast.success('Password reset successful!');
            navigate('/login'); // Login sayfasına yönlendirme
        } else {
            toast.error(data.message || 'Failed to reset password');
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while resetting the password.');
    }
};

  return (
    <div className="relative flex h-screen md:h-[130vh] lg:h-[130vh] items-center justify-center mx-auto">
      <img src={LoginBackground} alt="Background" className="inset-0 w-full h-full object-cover opacity-50" />
      <div className="z-1 absolute top-[20px] bg-white flex md:flex-row flex-col items-center justify-center w-[90%] md:w-[1000px]">
        <div className="flex gap-[40px] items-center justify-center p-8">
          <div className="md:w-[full] md:h-[100%] hidden md:block">
          <img src={GirlChanel} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="font-dancing text-[50px] hover:text-[#dbaf77]">Reset Password</p>
            </div>

            <form className="flex flex-col md:w-[480px] w-full" onSubmit={handleResetPassword}>
              <input
                type="password"
                id="password"
                placeholder="New Password"
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-[#0E1422] py-3 px-6 w-full justify-center items-center gap-[6px] text-[#FFFFFF] text-[14px] hover:bg-[#dbaf77] font-medium rounded-[4px] flex"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
