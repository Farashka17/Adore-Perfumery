import React from 'react';
import SingleReview from './singleReview';
import AddReview from './addReview';

const Reviews = () => {
  return (
    <div className="bg-white font-nunito mx-auto">
      <div className="container   max-w-[1120px]  ">

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
           <SingleReview />
           <SingleReview />

        </div>
       <div>
        <AddReview/>
       </div>

      </div>
    </div>
  );
};

export default Reviews;
