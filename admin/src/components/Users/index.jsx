import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleUser from '../SingleUser';

const UsersComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          console.error('Kullanıcılar alınırken hata oluştu');
          return;
        }
        const result = await response.json();
        setUserData(result.data);
      } catch (error) {
        console.error('Kullanıcılar alınırken hata oluştu:', error);
      }
    };
    fetchUsers();
  }, []);

  const userDeleteHandler = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.log('Kullanıcı silinemedi.');
        return;
      }
      setUserData((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.log('Kullanıcı silinirken hata oluştu:', error);
    }
  };

  return (
    <div className="bg-pink-100 min-h-[100vh] flex flex-col p-4">
      <Link to="/addUser">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add User
        </button>
      </Link>
      {userData.map((user) => (
        <SingleUser
          key={user._id}
          fullName={user.name}
          email={user.email}
          userDeleteHandler={() => userDeleteHandler(user._id)}
        />
      ))}
    </div>
  );
};

export default UsersComponent;
