import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import LoginBackground from '../../assets/LoginBackground.jpg'
import GirlChanel from '../../assets/GirlChanel.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',   // Last Name ekledim
    email: '',
    password: '',
    confirmPassword: '',  // Confirm Password ekledim
  });
  const navigate = useNavigate();

  const [error, setError] = useState('');  // Hata mesajı için bir state ekledim

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setError('Şifreler eşleşmiyor!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'Bir hata oluştu!');
            return;
        }

        const result = await response.json();
        alert(result.message);
        navigate('/login');
    } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        setError('Kayıt işlemi başarısız oldu, lütfen tekrar deneyin.');
    }
};


  return (
    <div className="relative flex items-center justify-center mx-auto">
      <img src={LoginBackground} alt="Background" className="inset-0 w-full h-full object-cover opacity-50" />
      <div className="z-1 absolute top-[20px] bg-white flex md:flex-row flex-col items-center justify-center w-[90%] md:w-[1000px]">
        <div className='flex gap-[40px] items-center justify-center p-2 md:p-8'>
          <div className='md:w-[full] hidden md:block'>
            <img src={GirlChanel} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className='font-dancing text-[50px] hover:text-[#dbaf77]'>Sign Up</p>
            </div>

            <form className="flex flex-col md:w-[480px] w-[300px]" onSubmit={handleSubmit}>
              <input
                type="text"
                id="text"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
              />
              
              {/* Last Name Input */}
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
              />
              
              {/* Confirm Password Input */}
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                className="py-[10px] px-[15px] mb-[15px] w-full border border-[#E6E7E8] rounded-[6px] font-dancing"
              />

              {/* Hata mesajı */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button className="bg-[#0E1422] py-3 px-6 w-full justify-center items-center gap-[6px] text-[#FFFFFF] text-[14px] hover:bg-[#dbaf77] font-medium rounded-[4px] flex ">
                Sign Up
              </button>
            </form>

            <Link
              to={"/login"}
              className="text-[14px] font-normal text-[#5C5F6A] mt-6 text-center hover:text-[#dbaf77]"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
