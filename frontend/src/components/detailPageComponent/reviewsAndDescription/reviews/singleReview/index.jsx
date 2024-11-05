import React from 'react';

const SingleReview = () => {
  return (
    <div className='flex gap-4 w-[360px] md:w-[500px] bg-gray-100 items-start justify-start p-4 rounded-md'>
      <div className='flex-shrink-0 w-[70px] h-[70px]'>
        <img 
          src="https://secure.gravatar.com/avatar/c2076d9dc1952386b9401f2dd2a3d95a?s=70&d=mm&r=g" 
          className='w-full h-full object-cover rounded-full'
          alt="Reviewer"
        />
      </div>
      <div className='flex flex-col'>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <span key={index} className='text-yellow-500'>
              ★
            </span>
          ))}
        </div>
        <p className='font-semibold text-gray-800 mt-2'>John Doe</p>
        <p className='text-gray-700 text-sm mt-1'>
          Duckbill gizzard shad redmouth whalefish yellowtail barracuda convict cichlid; saw shark yellowfin surgeonfish? Silver dollar salamanderfish longfin
        </p>
        <p className='text-gray-500 text-xs mt-2'>January 14, 2021</p>
      </div>
    </div>
  );
};

export default SingleReview;
