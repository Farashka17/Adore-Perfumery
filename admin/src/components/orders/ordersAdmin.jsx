import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SingleOrderAdmin from './singleOrderAdmin';

const OrdersAdmin = () => {
  const { userId } = useParams(); // useParams ile alınan ID

  console.log('Current User ID:', userId); // Debugging için ekleyin

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${userId}`);
        const data = await response.json();
        if (response.ok && data.length > 0) {
          setOrders(data);
        } else {
          setOrders([]);
          setError('No orders found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders && orders.length > 0 ? (
        orders.map((order) => <SingleOrderAdmin key={order._id} order={order} />)
      ) : (
        <div className="text-[40px] font-raleway font-thin">This user has no orders.</div>
      )}
    </div>
  );
};

export default OrdersAdmin;
