import UserIcon from "../../assets/user.svg"

const SingleUser = ({fullName,email,userName,userDeleteHandler,profilePic }) => {
  return (
    <div className="bg-gray-800 h-[120px] my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
        <div className="w-[80px] h-[80px]">
            <img src={profilePic ? profilePic:UserIcon} className="rounded-full" />
        </div>
        <div>
        <h1 className="text-white text-[28px] font-bold">{fullName}</h1>
        <p className="text-white text-[18px] font-400">{email}</p>
        <p className="text-white text-[18px] font-400">{userName}</p>
        </div>
        </div>
        <div className="flex items-center gap-8">
        <button className="border-yellow-500 border-2 rounded-lg py-1 px-4 bg-yellow-300 text-black font-bold">Edit</button>
        <button className="border-red-700 border-2 rounded-lg py-1 px-4 bg-red-800 text-white font-bold" onClick={userDeleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
