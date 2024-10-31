import React from "react";
import SingleOrderProduct from "../orderProduct";

const SingleOrder = () => {
  return (
    <div className="border  rounded-md overflow-hidden">
      <div className="flex gap-12 items-center  bg-[#ebebea] px-5 py-3">
      
          <p className="flex flex-col font-raleway">
            Order Date:
            <span>28october</span>
          </p>
          <p className="flex flex-col font-raleway">
            Order ID:<span> #1234567890</span>
          </p>
          <p className="flex flex-col font-raleway">
            Buyer: <span>Farah</span>
          </p>
          <p className="flex flex-col font-raleway ">
            Total amount: <span>500$</span>
          </p>
          <p className="flex flex-col font-raleway ">
           Shipping: <span>In transit</span>
          </p>
          <button className="border border-[#f1f0f0] px-6 py-2 bg-[#dba56d] rounded-md text-white">Details</button>
        
      </div>
      <div>
   <SingleOrderProduct/>
      </div>
    </div>
  );
};

export default SingleOrder;
