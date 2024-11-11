import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "../SingleProduct";

const ProductsComponent = () => {
  const [brandData, setBrandData] = useState([]);
  const [fragranceFamilyData, setFragranceFamilyData] = useState([]);
  const [concentrationData, setConcentrationData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  const [productData, setProductData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newDescription, setNewDescription] = useState(""); // Yeni description alanı
  const [newProductPrice, setNewProductPrice] = useState(""); // Yeni description alanı
  const [newProductStock, setNewProductStock] = useState(""); // Yeni description alanı
  const [newProductPic, setNewProductPic] = useState(null);

  // Edit için gerekli useState'ler
  const [brand, setBrand] = useState(""); // Brand seçimi için
  const [rating, setRating] = useState(""); // Rating için
  const [gender, setGender] = useState(""); // Gender için
  const [concentration, setConcentration] = useState(""); // Concentration için
  const [volume, setVolume] = useState(""); // Volume için
  const [fragranceFamily, setFragranceFamily] = useState(""); // Fragrance Family için
  const [newArrivals, setNewArrivals] = useState(false); // New Arrivals checkbox'ı için
  const [topSelling, setTopSelling] = useState(false); // Top Selling checkbox'ı için

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          console.log(`Failed to fetch products.`);
          return;
        }

        const result = await response.json();
        const products = Array.isArray(result.data) ? result.data : [];
        setProductData(products);
        console.log("Fetched products:", result);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const productDeleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log(`Failed to delete product.`);
        return;
      }
      setProductData((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const startEditHandler = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductStock(product.stock);

    setNewDescription(product.description || ""); // Eğer açıklama varsa düzenlemeye eklenir
    setNewProductPic(null);

    // Edit için gerekli field'lar
    setBrand(product.brand || "");
    setRating(product.rating || "");
    setGender(product.gender || "");
    setConcentration(product.concentration || "");
    setVolume(product.volume || "");
    setFragranceFamily(product.fragranceFamily || "");
    setNewArrivals(product.newArrivals || false);
    setTopSelling(product.topSelling || false);
  };

  const productEditHandler = async () => {
    if (!currentProduct) return;

    const formData = new FormData();
    formData.append("name", newProductName);
    formData.append("description", newDescription); 
    formData.append("price", newProductPrice); 
    formData.append("stock", newProductStock); 

    // Diğer form verileri
    formData.append("brand", brand);
    formData.append("rating", rating);
    formData.append("gender", gender);
    formData.append("concentration", concentration);
    formData.append("volume", volume);
    formData.append("fragranceFamily", fragranceFamily);
    formData.append("newArrivals", newArrivals);
    formData.append("topSelling", topSelling);
   
    if (newProductPic) {
      const productPicUrl = await uploadImage(newProductPic);
      if (!productPicUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      formData.append("productPic", productPicUrl);
    }

    try {
      const response = await fetch(`http://localhost:3000/products/${currentProduct._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        console.log("Failed to edit product. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }

      const updatedProduct = await response.json();
      setProductData((prevProducts) =>
        prevProducts.map((product) =>
          product._id === currentProduct._id ? updatedProduct : product
        )
      );

      setIsEditing(false);
      setCurrentProduct(null);
    } catch (error) {
      console.log("Error editing product:", error);
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
    <div className="bg-pink-100 min-h-screen flex flex-col p-4">
      <Link to="/addProduct">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add Product
        </button>
      </Link>
      {productData.map((product) => (
        <SingleProduct
          key={product._id}
          name={product.name}
          price={product.price}
          volume={product.volume}
          stock={product.stock}
          productPic={product.productPic}
          brand={product.brand}
          raiting={product.raiting}
          gender={product.gender}
          concentration={product.concentration}
          fragranceFamily={product.fragranceFamily}
          newArrivals={product.newArrivals}
          topSelling={product.topSelling}
          deleteProduct={() => productDeleteHandler(product._id)}
          editProduct={() => startEditHandler(product)}
        />
      ))}

      {isEditing && (
       <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center ">
  <div className="bg-white p-6 rounded shadow-lg w-1/3 max-h-screen overflow-y-auto">
    <h2 className="text-xl font-bold mb-3">Edit Product</h2>
    <label>Product Name</label>
    <input
      type="text"
      className="w-full p-2 border rounded mb-4"
      value={newProductName}
      onChange={(e) => setNewProductName(e.target.value)}
    />
    <label>Product Description</label>
    <textarea
      className="w-full p-2 border rounded mb-4"
      value={newDescription}
      placeholder="Description"
      onChange={(e) => setNewDescription(e.target.value)}
    />
    <label>Product Picture</label>
    <input
      type="file"
      className="w-full p-2 border rounded mb-4"
      onChange={(e) => setNewProductPic(e.target.files[0])}
    />
    <label>Product Price</label>
    <input
      type="number"
      className="w-full p-2 border rounded mb-4"
      value={newProductPrice}
      onChange={(e) => setNewProductPrice(e.target.value)}
    />
    <label>Product Stock</label>
    <input
      type="number"
      className="w-full p-2 border rounded mb-4"
      value={newProductStock}
      onChange={(e) => setNewProductStock(e.target.value)}
    />

    {/* Brand, Gender, Concentration, Volume, Fragrance Family Dropdowns */}
    <label>Product Brand</label>
    <select
      name="brand"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    >
      <option value="">Select Brand</option>
      {brandData.map((brand) => (
        <option key={brand._id} value={brand.name}>
          {brand.name}
        </option>
      ))}
    </select>

    <label>Product Gender</label>
    <select
      name="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Unisex">Unisex</option>
      <option value="Kids">Kids</option>
    </select>

    <label>Product Concentration</label>
    <select
      name="concentration"
      value={concentration}
      onChange={(e) => setConcentration(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    >
      <option value="">Select Concentration</option>
      {concentrationData.map((conc) => (
        <option key={conc._id} value={conc.name}>
          {conc.name}
        </option>
      ))}
    </select>

    <label>Product Volume</label>
    <select
      name="volume"
      value={volume}
      onChange={(e) => setVolume(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    >
      <option value="">Select Volume</option>
      {volumeData.map((vol) => (
        <option key={vol._id} value={vol.name}>
          {vol.name}
        </option>
      ))}
    </select>

    <label>Fragrance Family</label>
    <select
      name="fragranceFamily"
      value={fragranceFamily}
      onChange={(e) => setFragranceFamily(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    >
      <option value="">Select Fragrance Family</option>
      {fragranceFamilyData.map((family) => (
        <option key={family._id} value={family.name}>
          {family.name}
        </option>
      ))}
    </select>

    {/* Checkboxes for New Arrivals and Top Selling */}
    <div className="flex items-center">
      <label className="mr-2">New Arrivals</label>
      <input
        type="checkbox"
        checked={newArrivals}
        onChange={(e) => setNewArrivals(e.target.checked)}
      />
    </div>
    <div className="flex items-center">
      <label className="mr-2">Top Selling</label>
      <input
        type="checkbox"
        checked={topSelling}
        onChange={(e) => setTopSelling(e.target.checked)}
      />
    </div>

    <div className="mt-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        onClick={productEditHandler}
      >
        Save
      </button>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
};

export default ProductsComponent;
