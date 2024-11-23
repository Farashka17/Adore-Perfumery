import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddVolumeComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    volumePic: null,
    description: "", 
  });

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const volumeData = {
      name: formData.name
    };

    try {
      const response = await fetch("http://localhost:3000/volumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volumeData),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create volume: ${errorData.message}`);
      }

      alert("Volume created successfully!");
      navigate("/volume");
    } catch (error) {
      console.error("Error creating volume:", error);
      alert("Can't create volume: " + error.message);
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-center text-black font-bold text-[48px]">Create Volume</h1>

        <div className="flex flex-col items-center gap-2">
          <label className="text-black font-bold text-[24px]">
            Volume Name <sup>*</sup>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Volume Name"
            className="bg-gray-100 rounded-lg p-2 text-black"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="py-2 bg-pink-700 rounded-lg text-black text-[24px] font-bold"
        >
          Create Volume
        </button>
      </form>

      <div className="absolute top-24 right-2">
        <Link to="/volume">
          <button className="border-blue-700 border-2 rounded-lg py-1 px-4 bg-blue-800 text-black font-bold">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddVolumeComponent;
