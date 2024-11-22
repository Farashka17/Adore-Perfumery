import React from 'react';
import UserIcon from "../../assets/user.svg"
import {Link} from 'react-router-dom'
const SingleUser = ({ id,name, email, userRole, editBrand, userDeleteHandler, userPic }) => {
  return (
    <div className="bg-orange-200 h-[120px] my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <div className="w-[80px] h-[80px]">
            <img src={userPic ? userPic : UserIcon} className="rounded-full" alt="User" />
          </div>
          <div>
            <h1 className="text-black text-[28px] font-bold">{name}</h1>
            <p className="text-black text-[18px] font-400">userId:{id}</p>
            <p className="text-black text-[18px] font-400">{email}</p>
            <p className="text-black text-[18px] font-400">{userRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
      <Link to={`/users/${id}`}> <button className="border-violet-800 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold">Orders</button></Link> 
          <button className="border-orange-700 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold" onClick={editBrand}>Edit</button>
          <button className="border-violet-800 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold" onClick={userDeleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
