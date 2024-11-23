import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SingleOrderAdmin from './singleOrderAdmin';

const OrdersAdmin = () => {
  const { id } = useParams(); 

  console.log('Current User ID:', id); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${id}`);
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
  }, [id]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch('http://localhost:3000/orders/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus }),
      });
  
      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      } else {
        setError('Failed to update order status');
      }
    } catch (err) {
      setError('Server error');
    }
  };
  
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex  flex-col-reverse gap-4">
      {orders && orders.length > 0 ? (
        orders.map((order) => <SingleOrderAdmin key={order._id} order={order} onStatusChange={handleStatusChange}/>)
      ) : (
        <div className="text-[40px] font-raleway font-thin">This user has no orders.</div>
      )}
    </div>
  );
};

export default OrdersAdmin;
