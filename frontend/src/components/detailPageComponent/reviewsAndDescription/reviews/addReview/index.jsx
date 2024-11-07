import React, { useState } from 'react'
import Star from '../../../../../assets/Star.svg'
const AddReview = () => {
    const [rating, setRating] = useState(0); // Seçili yıldız sayısını saklar
  const [hover, setHover] = useState(0);   // Üzerinde durulan yıldız sayısını saklar
  const  totalStars=5
  return (

    <div >
        <p className='font-raleway mt-5 mb-6 text-[26px] text-[#232323]'>Add a review</p>
        <p className='text-[#616161] text-[16px] font-nunito font-normal'>Your email address will not be published. Required fields are marked *</p>
        <div className="flex space-x-1 mt-5">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className={`cursor-pointer transition-all duration-150 ${
              (hover || rating) >= starValue ? 'fill-yellow-500' : 'fill-gray-300'
            }`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
    <div className='mt-5 flex flex-col gap-3'>

    <textarea
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-5  placeholder:text-[#969696] font-nunito "
          placeholder="Your review"
        />
     <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-5  placeholder:text-[#969696] font-nunito "
          placeholder="Your Full Name"
        />
    <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-5  placeholder:text-[#969696] font-nunito "
          placeholder="Your Email"
    />
    </div>
    <button className='text-[16px] font-nunito text-black border border-black bg-white py-5 px-[70px] mt-6 hover:text-white hover:bg-black  '>
        SUBMIT
    </button>
    </div>
  )
}

export default AddReview