import { FragranceFamily } from '../models/fragranceFamily.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getFragranceFamilies = async (req, res) => {
  try {
    const families = await FragranceFamily.find();
    res.status(200).json({ message: "Fragrance families found", data: families });
  } catch (error) {
    console.error("Error fetching fragrance families:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleFragranceFamily = async (req, res) => {
  try {
    const { fragranceId } = req.params;
    const family = await FragranceFamily.findById(fragranceId);

    if (!family)
      return res.status(404).json({ message: "Fragrance family not found" });

    res.status(200).json({ message: "Fragrance family found", data: family });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFragranceFamily = async (req, res) => {
  try {
    const { fragranceId } = req.params;
    console.log("Attempting to delete fragrance family with ID:", fragranceId);
    const data = await FragranceFamily.findByIdAndDelete(fragranceId);

    if (!data) {
      console.error("Fragrance family not found for ID:", fragranceId);
      return res.status(404).json({ message: "Fragrance family not found" });
    }

    console.log("Fragrance family deleted successfully:", data);
    res.status(200).json({ message: "Fragrance family deleted successfully", data });
  } catch (error) {
    console.error("Error deleting fragrance family:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const editFragranceFamily = async (req, res) => {
  try {
    const { fragranceId } = req.params;
    console.log("Starting fragrance family update for ID:", fragranceId);

    if (!fragranceId || fragranceId.length !== 24) {
      console.error("Invalid ID format:", fragranceId);
      return res.status(400).json({ message: "Invalid ID format" });
    }

    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    let updatedData = { ...req.body };

    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "fragranceFamilies",
        });
        updatedData.fragrancePic = result.secure_url;
        console.log("Image successfully uploaded to Cloudinary:", result.secure_url);
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
      }
    } else {
      console.log("No file uploaded for Cloudinary.");
    }

    console.log("Updating fragrance family in MongoDB...");
    const updatedFamily = await FragranceFamily.findByIdAndUpdate(fragranceId, updatedData, {
      new: true,
    });

    if (!updatedFamily) {
      console.error("Fragrance family not found after update attempt. ID:", fragranceId);
      return res.status(404).json({ message: "Fragrance family not found" });
    }

    console.log("Fragrance family successfully updated:", updatedFamily);
    res.status(200).json(updatedFamily);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};

const addFragranceFamily = async (req, res) => {
  try {
    const { name, fragrancePic } = req.body;
    console.log("Backend'e gelen veriler:", { name, fragrancePic });

    const newFamily = new FragranceFamily({
      name,
      fragrancePic,
    });

    await newFamily.save();
    res.status(201).json(newFamily);
  } catch (error) {
    console.error("Veritabanına kaydedilemedi:", error);
    res.status(400).json({ message: error.message });
  }
};

export {
  getFragranceFamilies,
  getSingleFragranceFamily,
  deleteFragranceFamily,
  editFragranceFamily,
  addFragranceFamily,
};
