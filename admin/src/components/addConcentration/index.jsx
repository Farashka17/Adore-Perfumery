import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddConcentrationComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brandPic: null,
  });

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : e.target.value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let brandPicUrl = "";

    if (formData.brandPic) {
      brandPicUrl = await uploadImage(formData.brandPic);
      if (!brandPicUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const brandData = {
      name: formData.name,
      brandPic: brandPicUrl,
    };

    try {
      const response = await fetch("http://localhost:3000/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create brand: ${errorData.message}`);
      }

      alert("Brand created successfully!");
      navigate("/brand");
    } catch (error) {
      console.error("Error creating brand:", error);
      alert("Can't create brand: " + error.message);
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-center text-black font-bold text-[48px]">Create brand</h1>

        <div className="flex flex-col items-center gap-2">
          <label className="text-black font-bold text-[24px]">
            Brand Name <sup>*</sup>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Brand Name"
            className="bg-gray-100 rounded-lg p-2 text-black"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-black font-bold text-[24px]">Brand Picture</label>
          <input type="file" name="brandPic" className="text-black" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="py-2 bg-pink-700 rounded-lg text-black text-[24px] font-bold"
        >
          Create Concentration
        </button>
      </form>

      <div className="absolute top-2 right-2">
        <Link to="/brand">
          <button className="border-blue-700 border-2 rounded-lg py-1 px-4 bg-blue-800 text-black font-bold">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddConcentrationComponent;
