import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleUser from '../SingleUser';

const UsersComponent = () => {
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserPic, setNewUserPic] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      
      if (!response.ok) {
        console.error(`Failed to fetch users. Status: ${response.status}`);
        return;
      }
      const result = await response.json();
      const users = Array.isArray(result.data) ? result.data : [];
      setUserData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
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

  const startEditHandler = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setNewUserName(user.name);
    setNewUserRole(user.role);
    setNewUserPic(null); 
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "erndbi22"); 

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/doulwj7fu/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Image upload failed: ${errorText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const userEditHandler = async () => {
    if (!currentUser) return;
  
    const formData = new FormData();
    formData.append("name", newUserName);
    formData.append("role", newUserRole);
  
    if (newUserPic) {
      const userPicUrl = await uploadImage(newUserPic);
      if (!userPicUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      formData.append("userPic", userPicUrl);
    }
  
    try {
      const response = await fetch(`http://localhost:3000/users/${currentUser._id}`, {
        method: "PATCH",
        body: formData,
      });
  
      if (!response.ok) {
        console.log("Failed to edit user. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }
  
      const updatedUser = await response.json();
      setUserData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? updatedUser.data : user
        )
      );
  
      setIsEditing(false);
      setCurrentUser(null);
    } catch (error) {
      console.log("Error editing user:", error);
    }
  };

  return (
    <div className="bg-pink-100 min-h-[100vh] flex flex-col p-4">
      {/* <Link to="/addUser">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add User
        </button>
      </Link> */}
      {userData.map((user) => (
        <SingleUser
          id={user._id}
          key={user._id}
          name={user.name}
          email={user.email}
          userRole={user.role}
          userPic={user.userPic}
          userDeleteHandler={() => userDeleteHandler(user._id)}
          editBrand={() => startEditHandler(user)}
        />
      ))}

   
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)} 
            />
            <input
              type="file"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setNewUserPic(e.target.files[0])}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={userEditHandler}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
