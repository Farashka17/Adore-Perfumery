import React, { useEffect, useState } from 'react';
import SingleOrder from '../singleOrder';
import {useOrderStore} from '../../../store/useOrderStore';

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearOrders } = useOrderStore();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User not logged in');
        }
  
        const response = await fetch(`http://localhost:3000/orders/${userId}`);
        const data = await response.json();
  
        console.log("Gelen siparişler:", data); 
  
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

    window.addEventListener('loginStatusChanged', () => {
      setOrders([]);
    });

    return () => {
      window.removeEventListener('loginStatusChanged', () => {
        setOrders([]);
      });
    };

  }, []);
  

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col-reverse gap-4">
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <SingleOrder key={order._id} order={order} />
        ))
      ) : (
        <div className="text-[40px] font-raleway font-thin">This user has no orders.</div>
      )}
    </div>
  );
};

export default OrdersComponent;
