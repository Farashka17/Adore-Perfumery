import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const UsersComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          console.log(
            `Failed to fetch users: ${response.status} ${response.statusText}`
          );
          return;
        }

        const result = await response.json();
        console.log("Fetched users:", result);

        const users = Array.isArray(result.data) ? result.data : [];
        setUserData(users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const userDeleteHandler = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log(`Failed to delete user.`);
        return;
      }
      setUserData((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-[100vh] flex flex-col p-4">
      <Link to="/addUser">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add User
        </button>
      </Link>
      {userData.map((user) => (
        <SingleUser
          key={user._id}
          fullName={user.fullName}
          userName={user.userName}
          email={user.email}
          profilePic={user.profilePic}
          userDeleteHandler={() => userDeleteHandler(user._id)}
        />
      ))}
    </div>
  );
};

export default UsersComponent;
