import React, { useEffect, useState } from "react";
import SingleBrand from "../SingleBrand";

const BrandComponent = () => {
  const [brandData, setBrandData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState(null);

  useEffect(() => {
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
        console.log("Fetched brands:", result);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

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

 const brandEditHandler = async () => {
  if (!currentBrand) return;

  const formData = new FormData();
  formData.append("name", newBrandName);

  if (newBrandPic) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      formData.append("brandPic", base64String);

      try {
        const response = await fetch(`http://localhost:3000/brands/${currentBrand._id}`, {
          method: "PATCH",
          body: formData,
        });

        // Hata varsa, hata durum kodunu ve mesajı loglayın
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

    reader.readAsDataURL(newBrandPic); // Resmi base64 formatına dönüştür
  } else {
    // Eğer yeni bir fotoğraf yoksa, formData'ya ekleme yapmadan devam et
    try {
      const response = await fetch(`http://localhost:3000/brands/${currentBrand._id}`, {
        method: "PATCH",
        body: formData,
      });

      // Hata varsa, hata durum kodunu ve mesajı loglayın
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
  }
};


  return (
    <div>
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
