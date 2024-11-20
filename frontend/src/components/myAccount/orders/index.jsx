import React, { useEffect, useState } from 'react';
import SingleOrder from '../singleOrder';

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Yüklenme durumu için state
  const [error, setError] = useState(null); // Hata durumu için state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders'); // API endpoint
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders); // Backend'den dönen order'ları state'e kaydet
        } else {
          throw new Error(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Yüklenme durumunu sona erdir
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>; // Yükleniyor mesajı
  }

  if (error) {
    return <div>Error: {error}</div>; // Hata mesajı
  }

  return (
    <div className="flex flex-col gap-4">
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <SingleOrder key={order._id} order={order} /> // SingleOrder bileşenine order verisi gönder
        ))
      ) : (
        <div className='text-[40px] font-raleway font-thin'>This user has no orders.</div> // Sipariş yoksa mesaj göster
      )}
    </div>
  );
};

export default OrdersComponent;
