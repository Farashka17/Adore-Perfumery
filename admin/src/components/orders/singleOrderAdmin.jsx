import React, { useState } from 'react';
import SingleOrderProductAdmin from './singleOrderProductAdmin';

const SingleOrderAdmin = ({ order, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    await onStatusChange(order._id, newStatus);
  };

  return (
    <div className="border rounded-md overflow-hidden p-10">
      <div className="flex gap-12 items-center bg-[#ebebea] px-5 py-3">
        <p className="flex flex-col font-raleway">
          Order Date:
          <span>{order.date}</span>
        </p>
        <p className="flex flex-col font-raleway">
          Order ID: <span>#{order._id}</span>
        </p>
        <p className="flex flex-col font-raleway">
          Total amount: <span>{order.totalAmount}$</span>
        </p>
        <p className="flex flex-col font-raleway">
          Shipping:
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border rounded-md px-2 py-1"
          >
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Enroute">Enroute</option>
            <option value="Delivered">Delivered</option>
          </select>
        </p>
        <button className="border border-[#f1f0f0] px-6 py-2 bg-[#dba56d] rounded-md text-white">
          Details
        </button>
      </div>
      <div>
        {order.products && order.products.length > 0 ? (
          order.products.map((product) => (
            <SingleOrderProductAdmin key={product._id} product={product} />
          ))
        ) : (
          <div>No products in this order.</div>
        )}
      </div>
    </div>
  );
};

export default SingleOrderAdmin;
