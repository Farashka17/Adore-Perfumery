import React from 'react';

const SingleFragranceType = ({ name, description, fragrancePic }) => {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <img src={fragrancePic || 'default-image-path.jpg'} alt={name} className='w-[100px] h-[100px]'/>
      <p className="text-[30px] font-thin font-dancing text-[#232323] mt-[33px]">{name}</p>
      <p className="text-[16px] font-nunito font-extralight text-[#232323] mt-5">{description}</p>
    </div>
  );
};

export default SingleFragranceType;
