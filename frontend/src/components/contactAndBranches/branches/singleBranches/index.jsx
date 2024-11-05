import React from 'react';

const SingleBranches = ({ branch, onMapClick }) => {
  return (
    <div className='flex p-5 bg-[#fff0db] rounded-md gap-4'>
      <div className='w-[260px] h-[160px]'>
        <img src={branch.imgUrl} alt={branch.name} className='w-[260px] h-[160px]' />
      </div>
      <div className='flex flex-col justify-between items-start'>
        <div>  
          <p className='font-raleway text-[16px]'>{branch.hours}</p>
          <p className='mt-2 text-[#b98e56] text-[18px] font-raleway'>{branch.name}</p>
        </div>
        <div>
          <p className='font-raleway'>{branch.address}</p>
          <p className='font-raleway'>{branch.phone}</p>
        </div>
        <button 
          className='font-raleway  hover:text-[#b98e56]' 
          onClick={() => onMapClick(branch)}
        >
          Look in map
        </button>
      </div>
    </div>
  );
};

export default SingleBranches;
