import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProductComponent = () => {
  const [categoryData, setCategoryData] = useState([]);
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
    images: [],
    userId: "",
    categoryId: "",
    newArrivals: false,
    topSelling: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? Array.from(files) : value,
    }));
  };

  const uploadImages = async (files) => {
    const imageUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hof1ji4h");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dj294wevk/image/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Image upload failed");

        const data = await response.json();
        imageUrls.push({ public_id: data.public_id, url: data.secure_url });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let images = [];
    if (formData.images.length) {
      images = await uploadImages(formData.images);
    }

    const productData = {
      ...formData,
      images,
    };

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      const result = await response.json();
      alert("Product created successfully", result);
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Can't create Product...");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        if (!response.ok) {
          console.log(`Failed to fetch categories.`);
          return;
        }

        const result = await response.json();
        const categories = Array.isArray(result.data) ? result.data : [];
        setCategoryData(categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
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
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
          <option value="Kids">Kids</option>
        </select>

        <label className="block text-gray-700">Concentration</label>
        <input
          type="text"
          name="concentration"
          value={formData.concentration}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <label className="block text-gray-700">Volume (ml)</label>
        <input
          type="number"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <label className="block text-gray-700">Fragrance Family</label>
        <input
          type="text"
          name="fragranceFamily"
          value={formData.fragranceFamily}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <label className="block text-gray-700">Product Images</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductComponent;
