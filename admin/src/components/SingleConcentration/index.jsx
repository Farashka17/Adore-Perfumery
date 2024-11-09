import { useState } from "react";
import User from '../../assets/user.svg';

const SingleConcentration = ({ name, id, deleteConcentration, editConcentration, description }) => {
  return (
    <div className="bg-orange-200 h-[120px] my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
        
          <div>
            <h1 className="text-black text-[28px] font-bold">{name}</h1>
            <p className="text-black text-[18px] font-bold">{id}</p>
            <p className="text-black text-[16px] ">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button
            className="border-orange-700 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
            onClick={editConcentration}
          >
            Edit
          </button>
          <button
            className="border-violet-800 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
            onClick={deleteConcentration}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default SingleConcentration;
