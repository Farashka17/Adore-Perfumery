import React from "react";
import SingleOrderProduct from "../orderProduct";

const SingleOrder = ({ order }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex gap-12 items-center bg-[#ebebea] px-5 py-3">
        <p className="flex flex-col font-raleway">
          Order Date:
          <span>{order.date}</span> {/* Dinamik olarak order tarihini al */}
        </p>
        <p className="flex flex-col font-raleway">
          Order ID: <span>#{order._id}</span> {/* Dinamik order ID */}
        </p>
       
        <p className="flex flex-col font-raleway">
          Total amount: <span>{order.totalAmount}$</span> {/* Dinamik olarak total amount */}
        </p>
        <p className="flex flex-col font-raleway">
          Shipping: <span>{order.status}</span> {/* Dinamik olarak shipping durumu */}
        </p>
        <button className="border border-[#f1f0f0] px-6 py-2 bg-[#dba56d] rounded-md text-white">
          Details
        </button>
      </div>
      <div>
        {/* Burada her bir siparişin ürünlerini map ediyoruz */}
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
