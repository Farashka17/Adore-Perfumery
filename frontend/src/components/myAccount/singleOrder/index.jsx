import React from "react";
import SingleOrderProduct from "../orderProduct";

const SingleOrder = ({ order }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="md:flex flex-col md:flex-row gap-12 items-center bg-[#ebebea] px-5 py-3">
        <p className="flex flex-row  font-raleway font-semibold">
          Order Date:
          <span className="font-normal">{order.date}</span> 
        </p>
        <p className="flex flex-row font-raleway font-semibold">
          Order ID: <span className="font-normal">#{order._id}</span> 
        </p>
       
        <p className="flex flex-row font-raleway font-semibold">
          Total amount: <span className="font-normal">{order.totalAmount}$</span> 
        </p>
        <p className="flex flex-row font-raleway font-semibold">
          Shipping: <span className="font-normal">{order.status}</span> 
        </p>
       
      </div>
      <div>
       
        {order.products && order.products.length > 0 ? (
          order.products.map((product) => (
            <SingleOrderProduct key={product._id} product={product} />
          ))
        ) : (
          <div>No products in this order.</div>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
