import { useState } from "react";
import User from '../../assets/user.svg';

const SingleFragranceFamily = ({ name, id, fragrancePic, deleteFragrance, editFragrance, description }) => {
  return (
    <div className="bg-orange-200 h-[120px] my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
        <div className="w-[90px] h-[90px] min-w-[90px] min-h-[90px] flex justify-center items-center">
          <img 
      src={fragrancePic ? fragrancePic : User} 
      className="rounded-full  w-[90px] h-[90px] object-cover" 
    />

          </div>
          <div>
            <h1 className="text-black text-[28px] font-bold">{name}</h1>
            <p className="text-black text-[18px] font-bold">{id}</p>
            <p className="text-black text-[16px] ">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button
            className="border-orange-700 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
            onClick={editFragrance}
          >
            Edit
          </button>
          <button
            className="border-violet-800 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
            onClick={deleteFragrance}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default SingleFragranceFamily;
