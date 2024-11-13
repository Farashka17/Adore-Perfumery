import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProductComponent = () => {
    const [brandData, setBrandData] = useState([]);
    const [fragranceFamilyData, setFragranceFamilyData] = useState([]);
    const [concentrationData, setConcentrationData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: 1,
        brand: "",
        rating: 0,
        gender: "",
        concentration: "",
        volume: "",
        fragranceFamily: "",
        productPic: null,
        newArrivals: false,
        topSelling: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, checked, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
  
      let productPicUrl = "";
  
      if (formData.productPic) {
          productPicUrl = await uploadImage(formData.productPic);
          if (!productPicUrl) {
              alert("Image upload failed. Please try again.");
              return;
          }
      }
  
      const productData = {
          ...formData,
          productPic: productPicUrl, // Image URL'si
      };
  
      console.log("Product Data to send:", productData); // Gönderilecek veriyi logluyoruz
  
      try {
          const response = await fetch("http://localhost:3000/products", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Failed to create product: ${errorData.message}`);
          }
  
          alert("Product created successfully!");
          navigate("/products");
      } catch (error) {
          console.error("Error creating product:", error);
          alert("Can't create product: " + error.message);
      }
  };
  
    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log(`Failed to fetch data from ${url}`);
                    return;
                }
                const result = await response.json();
                setter(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData("http://localhost:3000/brands", setBrandData);
        fetchData("http://localhost:3000/fragranceFamily", setFragranceFamilyData);
        fetchData("http://localhost:3000/concentrations", setConcentrationData);
        fetchData("http://localhost:3000/volumes", setVolumeData);
    }, []);

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <label className="block text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <label className="block text-gray-700">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <label className="block text-gray-700">Brand</label>
                <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select Brand</option>
                    {brandData.map((brand) => (
                        <option key={brand._id} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Rating</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <label className="block text-gray-700">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Kids">Kids</option>
                </select>

                <label className="block text-gray-700">Concentration</label>
                <select
                    name="concentration"
                    value={formData.concentration}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select Concentration</option>
                    {concentrationData.map((conc) => (
                        <option key={conc._id} value={conc.name}>
                            {conc.name}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Volume</label>
                <select
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select Volume</option>
                    {volumeData.map((vol) => (
                        <option key={vol._id} value={vol.name}>
                            {vol.name}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Fragrance Family</label>
                <select
                    name="fragranceFamily"
                    value={formData.fragranceFamily}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select Fragrance Family</option>
                    {fragranceFamilyData.map((family) => (
                        <option key={family._id} value={family.name}>
                            {family.name}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Product Image</label>
                <input
                    type="file"
                    name="productPic"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <label className="block text-gray-700">New Arrivals</label>
                <input
                    type="checkbox"
                    name="newArrivals"
                    checked={formData.newArrivals}
                    onChange={handleChange}
                />

                <label className="block text-gray-700">Top Selling</label>
                <input
                    type="checkbox"
                    name="topSelling"
                    checked={formData.topSelling}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductComponent;
