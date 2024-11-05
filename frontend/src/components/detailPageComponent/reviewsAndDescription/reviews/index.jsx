import React from 'react';
import SingleReview from './singleReview';

const Reviews = () => {
  return (
    <div className="bg-white font-nunito mx-auto">
      <div className="container   max-w-[1120px]  ">

        <div className='flex my-5'>
          <button className='py-2 px-5 border border-black text-[20px] font-raleway' >Description</button>
          <button className='py-2 px-5 border border-black text-[20px] font-raleway' >Reviews <span>(1)</span></button>
        </div>
        <div className='grid grid-cols-2'>
           <SingleReview />
        </div>
       

      </div>
    </div>
  );
};

export default Reviews;
