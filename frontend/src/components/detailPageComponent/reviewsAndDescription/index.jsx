import React, { useState } from 'react';
import Reviews from './reviews';
import Description from './description';

const ReviewsAndDescription = ({product}) => {

  const [selectedTab, setSelectedTab] = useState('description'); 

  return (
    <div className="bg-white font-nunito mx-auto">
      <div className="container  max-w-[1120px]  ">
      <div className='flex my-5'>
      <button
  className={`py-2 px-5 border border-black text-[20px] font-raleway ${
    selectedTab === 'description' ? 'bg-black text-white' : ''
  }`}
  onClick={() => setSelectedTab('description')}
>
  Description
</button>
<button
  className={`py-2 px-5 border border-black text-[20px] font-raleway ${
    selectedTab === 'reviews' ? 'bg-black text-white' : ''
  }`}
  onClick={() => setSelectedTab('reviews')}
>
  Reviews <span>(1)</span>
</button>
        </div>
        {selectedTab === 'description' && <Description product={product}/>}
        {selectedTab === 'reviews' && <Reviews />}
       

      </div>
    </div>
  );
};

export default ReviewsAndDescription;
