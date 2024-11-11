import React from "react";
import User from '../../assets/user.svg'

const SingleProduct = ({name,price,stock,brand,productPic,deleteProduct,editProduct,volume,raiting,gender,concentration,fragranceFamily,newArrivals,topSelling}) => {
  return (
    <div className="bg-orange-200  my-2 w-full">
      <div className="py-4 flex items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
        <div className="w-[90px] h-[90px] min-w-[90px] min-h-[90px] flex justify-center items-center">
          <img 
      src={productPic ? productPic : ""} 
      className="rounded-full  w-[90px] h-[90px] object-cover" 
    />

          </div>
          <div>
            <h1 className="text-black text-[28px] font-bold">{name}</h1>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        
        <p className="text-black text-[18px] font-400">{`Brand : ${brand}`}</p>
        <p className="text-black text-[18px] font-400">{`Price :${price}$ `}</p>
        <p className="text-black text-[18px] font-400">{`Stock : ${stock}`}</p>
        <p className="text-black text-[18px] font-400">{`Volume : ${volume}`}</p>
        <p className="text-black text-[18px] font-400">{`Raiting : ${raiting}`}</p>
        <p className="text-black text-[18px] font-400">{`Gender : ${gender}`}</p>
        <p className="text-black text-[18px] font-400">{`Concentration : ${concentration}`}</p>
        <p className="text-black text-[18px] font-400">{`Fragrancy Family : ${fragranceFamily}`}</p>
        <p className="text-black text-[18px] font-400">{`New Arrivals : ${newArrivals}`}</p>
        <p className="text-black text-[18px] font-400">{`Top Selling : ${topSelling}`}</p>
        </div>
        </div>
        <div className="flex items-center gap-8">
        <button
        className="border-orange-700 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
        onClick={editProduct}
        >Edit</button>
        <button 
        className="border-violet-800 border-2 rounded-lg py-1 px-4 bg-gray-100 text-black font-bold"
        onClick={deleteProduct}>Delete</button>
   

        </div>
      </div>
    </div>
  );
};

export default SingleProduct;