import { Brand } from '../models/brand.js'
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const getBrands = async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json({ message: "Brands found", data: brands });
    } catch (error) {
      console.error("Error fetching brands:", error); // Hata mesajını konsola yazdır
      res.status(500).json({ message: error.message });
    }
  };
const getSingleBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    if (!brand)
      return res.status(404).json({ message: "Brand not found" });

    res.status(200).json({ message: "Brand found", data: brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Attempting to delete brand with ID:", id); // Hata ayıklama için log ekleyin
    const data = await Brand.findByIdAndDelete(id);

    if (!data) {
      console.error("Brand not found for ID:", id); // Hata ayıklama için log ekleyin
      return res.status(404).json({ message: "Brand not found" });
    }

    console.log("Brand deleted successfully:", data); // Hata ayıklama için log ekleyin
    res.status(200).json({ message: "Brand deleted successfully", data });
  } catch (error) {
    console.error("Error deleting brand:", error.message); // Hata ayıklama için log ekleyin
    res.status(500).json({ message: error.message });
  }
};

const editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Starting brand update for ID:", id);

    // ID'nin doğruluğunu kontrol edelim
    if (!id || id.length !== 24) { // 24 karakter olması, ObjectId formatına uygunluk kontrolü
      console.error("Invalid ID format:", id);
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    // Gelen veriyi loglayarak kontrol edelim
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    let updatedData = { ...req.body };

    // Dosya yüklendiyse, Cloudinary'e gönder
    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "brands",
        });
        updatedData.brandPic = result.secure_url;
        console.log("Image successfully uploaded to Cloudinary:", result.secure_url);
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
      }
    } else {
      console.log("No file uploaded for Cloudinary.");
    }

    // Brand'ı güncelleme işlemi
    console.log("Updating brand in MongoDB...");
    const updatedBrand = await Brand.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBrand) {
      console.error("Brand not found after update attempt. ID:", id);
      return res.status(404).json({ message: "Brand not found" });
    }

    console.log("Brand successfully updated:", updatedBrand);
    res.status(200).json(updatedBrand);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};




const addBrand = async (req, res) => {
  try {
    const { name, brandPic } = req.body;
    console.log("Backend'e gelen veriler:", { name, brandPic });

    const newBrand = new Brand({
      name,
      brandPic,
    });

    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Veritabanına kaydedilemedi:", error);
    res.status(400).json({ message: error.message });
  }
};


export {
  getBrands,
  getSingleBrand,
  deleteBrand,
  editBrand,
  addBrand,
};
