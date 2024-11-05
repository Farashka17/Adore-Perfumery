import React from 'react';
import Reviews from './reviews';
import Description from './description';

const ReviewsAndDescription = () => {
  return (
    <div className="bg-white font-nunito mx-auto">
      <div className="container   max-w-[1120px]  ">

      <Reviews/>
      <Description/>
       

      </div>
    </div>
  );
};

export default ReviewsAndDescription;
