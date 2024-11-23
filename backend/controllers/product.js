import { Product } from "../models/product.js";

const getProducts = async (req, res) => {
  try {
    const { brand, volume, concentration, fragranceFamily, gender } = req.query;

    const query = {};

    if (brand) query.brand = brand;
    if (volume) query.volume = volume;
    if (concentration) query.concentration = concentration;
    if (fragranceFamily) query.fragranceFamily = fragranceFamily;
    if (gender) query.gender = gender; // Bu kısmı unutmayın!

    const products = await Product.find(query);
    res.status(200).json({ message: "Product(s) found", data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);

    if (!data)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully",data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const editProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedProduct)
//       return res.status(404).json({ message: "Product not found" });

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Starting fragrance family update for ID:", id);

    if (!id || id.length !== 24) {
      console.error("Invalid ID format:", id);
      return res.status(400).json({ message: "Invalid ID format" });
    }

    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    let updatedData = { ...req.body };

    // If a new image is uploaded, handle the image upload
    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.productPic = result.secure_url;
        console.log("Image successfully uploaded to Cloudinary:", result.secure_url);
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
      }
    } else {
      console.log("No file uploaded for Cloudinary.");
    }

    console.log("Updating product in MongoDB...");
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      console.error("Product not found after update attempt. ID:", id);
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product successfully updated:", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};
  const createProduct = async (req, res) => {
    try {
        const { 
            name, description, price, stock, brand, rating, gender, concentration, 
            volume, fragranceFamily, productPic, newArrivals, topSelling 
        } = req.body;

        console.log("Data coming to the backend:", { 
            name, description, price, stock, brand, rating, gender, concentration, 
            volume, fragranceFamily, productPic, newArrivals, topSelling 
        });

        const newProduct = new Product({
            name, description, price, stock, brand, rating, gender, concentration, 
            volume, fragranceFamily, productPic, newArrivals, topSelling
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Failed to save to database:", error);
        res.status(400).json({ message: error.message });
    }
};


export {
  getProducts,
  getSingleProduct,
  deleteProduct,
  editProduct,
  createProduct
};
