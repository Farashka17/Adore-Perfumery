import React, { useState } from "react";

const AccountInformation = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("farashka15@gmail.com");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [isCorporate, setIsCorporate] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Information updated!");
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Membership Information Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-[#fca36f] mb-4">Membership Information</h2>
          <label className="block mb-3">
            First Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>
          <label className="block mb-3">
            Last Name
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>
          <label className="block mb-3">
            E-Mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>
          <label className="block mb-3">
            Phone Number
            <input
              type="text"
              placeholder="+994"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>
          <label className="block mb-2">Date of Birth</label>
          <div className="flex gap-2 mb-3">
            <select
              value={birthDate.day}
              onChange={(e) =>
                setBirthDate({ ...birthDate, day: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            >
              <option>Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={birthDate.month}
              onChange={(e) =>
                setBirthDate({ ...birthDate, month: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            >
              <option>Month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={birthDate.year}
              onChange={(e) =>
                setBirthDate({ ...birthDate, year: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            >
              <option>Year</option>
              {[...Array(100)].map((_, i) => (
                <option key={i} value={2023 - i}>
                  {2023 - i}
                </option>
              ))}
            </select>
          </div>
          {/* <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={isCorporate}
              onChange={() => setIsCorporate(!isCorporate)}
              className="mr-2"
            />
            I would like to be informed of offers for my business purchases.
          </label> */}
        </div>

        {/* Password Update Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-[#fca36f] mb-4">Password Update</h2>
          <label className="block mb-3">
            Current Password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>
          <label className="block mb-3">
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
            <small className="text-xs text-gray-500">Your password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one number.</small>
          </label>
          <label className="block mb-3">
            Confirm New Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:text-[#fca36f]  focus:outline-none"
            />
          </label>

          <button type="submit" className="w-full py-2 px-4 bg-[#fca36f]  text-white rounded-md hover:bg-orange-500 transition-colors">
            Update
          </button>

          {/* <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#fca36f] mb-4">Two-Factor Authentication</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={handleToggleTwoFactor}
                className="mr-2"
              />
              Enable two-factor authentication
            </label>
          </div> */}
        </div>
      </div>
    </form>
  );
};

export default AccountInformation;
