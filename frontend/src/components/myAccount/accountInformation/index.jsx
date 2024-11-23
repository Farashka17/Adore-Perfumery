import React, { useEffect, useState } from "react";

const AccountInformation = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        if (!userId) throw new Error("User ID not found.");
  
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const data = await response.json();
        
        setName(data.name || "");
        setSurname(data.surname || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserInfo();
  }, []);
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email
          
        }),
      });

      if (response.ok) {
        alert("Information updated!");
      } else {
        alert("Failed to update information.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-[#fca36f] mb-4">Membership Information</h2>
          <label className="block mb-3">
            First Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f] focus:outline-none"
              placeholder="Enter your first name"
            />
          </label>
          <label className="block mb-3">
            Last Name
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f] focus:outline-none"
              placeholder="Enter your last name"
            />
          </label>
          <label className="block mb-3">
            E-Mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f] focus:outline-none"
              placeholder="Enter your email"
            />
          </label>
       
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#fca36f] text-white rounded-md hover:bg-orange-500 transition-colors"
          >
            Update Information
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountInformation;
