import React, { useEffect, useState } from 'react';
import OrdersComponent from './orders';
import AccountInformation from '../accountInformation';
import Adress from './adress';
import { useCartStore } from '../../store/useCartStore';

const MyAccount = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeComponent, setActiveComponent] = useState('account'); // Varsayılan olarak "Account Information" açık
  const { clearCart } = useCartStore();

  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('userName');
      const role = localStorage.getItem('role');
      if (user) {
        setUserName(user);
        setIsLoggedIn(true);
        setUserRole(role);
      } else {
        setUserName('');
        setIsLoggedIn(false);
        setUserRole('');
      }
    };

    checkUserStatus();

    window.addEventListener('loginStatusChanged', checkUserStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkUserStatus);
    };
  }, []);

  const handleLogout = () => {
    clearCart();
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    window.dispatchEvent(new Event('loginStatusChanged'));
  };

  return (
    <div className="bg-[white] md:mx-auto font-nunito">
      <div className="container max-w-[1320px] flex flex-col gap-10 justify-center mx-auto md:px-10 py-[25px] px-[15px]">
        {/* Sidebar */}
        <div className="flex justify-between flex-col md:flex-row items-start px-20">
          <button onClick={() => setActiveComponent('account')}>
            <p className="text-[20px] font-raleway font-thin">Account Information</p>
          </button>
          <button onClick={() => setActiveComponent('orders')}>
            <p className="text-[20px] font-raleway font-thin">Orders</p>
          </button>
          {/* <button onClick={() => setActiveComponent('address')}>
            <p className="text-[20px] font-raleway font-thin">Address</p>
          </button> */}
          <button onClick={handleLogout}>
            <p className="text-[20px] font-raleway font-thin">Sign out</p>
          </button>
        </div>

        {/* Aktif Component */}
        <div>
          {activeComponent === 'account' && <AccountInformation />}
          {activeComponent === 'orders' && <OrdersComponent />}
          {/* {activeComponent === 'address' && <Adress />} */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
