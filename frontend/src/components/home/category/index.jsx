import React, { useEffect, useState } from 'react';
import SingleFragranceType from './SingleFragrance';

const Category = () => {
  const [fragranceData, setFragranceData] = useState([]);

 
  const fetchFragranceData = async () => {
    try {
      const response = await fetch("http://localhost:3000/fragranceFamily");
      if (!response.ok) throw new Error("Failed to fetch fragrance data.");
      const result = await response.json();
      setFragranceData(result.data || []);
    } catch (error) {
      console.error("Error fetching fragrance data:", error);
    }
  };

  useEffect(() => {
    fetchFragranceData();
  }, []);

  return (
    <div className="mx-auto">
      <div className="container max-w-[1120px] mx-auto my-[60px]">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[#000] text-[52px] font-dancing font-regular">Category</p>
          <p className="font-raleway font-thin text-[38px] text-[#232323] leading-[56px]">Fragrance Types</p>
          <p className="text-[#9A9A9A] font-nunito font-extralight text-[18px] mt-[10px]">The stylish and organized cosmetic products</p>
        </div>
        <div className="flex gap-[50px] mx-auto flex-col md:flex-row text-center mt-12">
     
          {fragranceData.slice(0, 4).map((fragrance) => (
            <SingleFragranceType
              key={fragrance._id}
              name={fragrance.name}
              description={fragrance.description}
              fragrancePic={fragrance.fragrancePic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
