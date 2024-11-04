import { useState } from "react";
import User from '../../assets/user.svg';

const SingleFragranceFamily = ({ name, id, fragrancePic, deleteFragrance, editFragrance }) => {
  return (
    <div className="bg-orange-200 h-[120px] my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <div className="w-[80px] h-[80px]">
            <img src={fragrancePic ? fragrancePic : User} className="rounded-full" />
          </div>
          <div>
            <h1 className="text-black text-[28px] font-bold">{name}</h1>
            <p className="text-black text-[18px] font-bold">{id}</p>
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
