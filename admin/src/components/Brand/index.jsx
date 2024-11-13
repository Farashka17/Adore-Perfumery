import React, { useEffect, useState } from "react";
import SingleBrand from "../SingleBrand";
import { Link } from "react-router-dom";

const  BrandComponent = () => {
  const [brandData, setBrandData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState(null);

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:3000/brands");
      if (!response.ok) {
        console.error(`Failed to fetch brands. Status: ${response.status}`);
        return;
      }
      const result = await response.json();
      const brands = Array.isArray(result.data) ? result.data : [];
      setBrandData(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const brandDeleteHandler = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:3000/brands/${brandId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log(`Failed to delete brand.`);
        return;
      }
      setBrandData((prevBrands) =>
        prevBrands.filter((brand) => brand._id !== brandId)
      );
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };

  const startEditHandler = (brand) => {
    setIsEditing(true);
    setCurrentBrand(brand);
    setNewBrandName(brand.name);
    setNewBrandPic(null); // Yeni fotoğraf seçilmesini bekliyoruz
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "erndbi22"); // Preset ismini buraya yazın

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

  const brandEditHandler = async () => {
    if (!currentBrand) return;

    const formData = new FormData();
    formData.append("name", newBrandName);

    if (newBrandPic) {
      const brandPicUrl = await uploadImage(newBrandPic);
      if (!brandPicUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      formData.append("brandPic", brandPicUrl);
    }

    try {
      const response = await fetch(`http://localhost:3000/brands/${currentBrand._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        console.log("Failed to edit brand. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }

      const updatedBrand = await response.json();
      setBrandData((prevBrands) =>
        prevBrands.map((brand) =>
          brand._id === currentBrand._id ? updatedBrand : brand
        )
      );

      setIsEditing(false);
      setCurrentBrand(null);
    } catch (error) {
      console.log("Error editing brand:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[100vh] flex flex-col p-4">
      <Link to="/addbrand">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add brand
        </button>
      </Link>

      {brandData.map((brand) => (
        <SingleBrand
          key={brand._id}
          name={brand.name}
          id={brand._id}
          brandPic={brand.brandPic}
          deleteBrand={() => brandDeleteHandler(brand._id)}
          editBrand={() => startEditHandler(brand)}
        />
      ))}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
            />
            <input
              type="file"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setNewBrandPic(e.target.files[0])}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={brandEditHandler}
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

export default BrandComponent;
