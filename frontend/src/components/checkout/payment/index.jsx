import React from "react";
import OrangeShape from "../../../assets/OrangeShape.svg";
import SingleCheckoutProduct from "../singleCheckoutProduct";
const Payment = () => {
  return (
    <div className=" w-[390px] p-6 md:pt-6 md:p-0 ">
      <div>
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Your order
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <SingleCheckoutProduct />
        <SingleCheckoutProduct />
      </div>
      <div className="mt-14">
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Cart Totals
        </p>
      </div>
      <div className="mt-5 flex flex-col ">
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-extralight font-nunito text-[#232323">
            Subtotal
          </p>
          <p className="text-[18px] font-extralight font-nunito text-[#232323">
            $15.00
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-extralight font-nunito text-[#232323]">
            Total
          </p>
          <p className="text-[18px] font-extralight font-nunito text-[#232323]">
            $15.00
          </p>
        </div>
      </div>
      <div className="mt-14">
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Payment Method
        </p>
      </div>
     
        <div className="flex flex-col gap-1 my-4 justify-between bg-yellow-50 rounded-[30px] p-2 custom-bg ">
          <div className="w-full">
            <label className="text-[12px] font-extralight font-raleway text-[#232323}">
              Name on Cart
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1  w-full border border-[#E0E0E0] p-2 bg-gray-200 rounded-sm placeholder:text-[#969696] font-raleway "
              placeholder="Name on Cart"
            />
          </div>

          <div className="w-full">
            <label className="text-[12px] font-extralight font-raleway text-[#232323}">
              Cart Number
            </label>

            <input
              type="text"
              id="firstName"
              className="mt-1  w-full border border-[#E0E0E0] p-2 bg-gray-200 rounded-sm font-raleway placeholder:text-[#969696]  "
              placeholder="Cart Number"
            />
          </div>

          <div className="flex flex-row gap-4 mb-4 justify-between">
            {/* Date */}
            <div className="w-full">
              {/* <label className='text-[12px] font-extralight font-raleway text-[#232323}'>Date</label> */}
              <input
                type="text"
                id="firstName"
                className="mt-1  w-full border border-[#E0E0E0] p-2 bg-gray-200 rounded-sm  placeholder:text-[#969696] font-raleway "
                placeholder="Date"
              />
            </div>

            {/* CVV */}
            <div className="w-full">
              {/* <label className='text-[12px] font-extralight font-raleway text-[#232323}'>CVV</label> */}

              <input
                type="text"
                id="lastName"
                className="mt-1  w-full border border-[#E0E0E0] p-2 bg-gray-200 rounded-sm  placeholder:text-[#969696] font-raleway "
                placeholder="CVV"
              />
            </div>
          </div>
       
      </div>
      <button className="text-[#232323] font-raleway font-thin text-[13px] text-center py-5 w-full border border-[#232323] mt-6 hover:bg-[#dbaf77]">PLACE ORDER</button>
    </div>
  );
};

export default Payment;
