import { Concentrations } from '../models/concentration.js'
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getConcentrations = async (req, res) => {
  try {
    const concentrations = await Concentrations.find();
    res.status(200).json({ message: "Concentrations families found", data: concentrations });
  } catch (error) {
    console.error("Error fetching concentrations:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleConcentration = async (req, res) => {
  try {
    const { concentrationId } = req.params;
    const concentration = await Concentrations.findById(concentrationId);

    if (!concentration)
      return res.status(404).json({ message: "Concentration not found" });

    res.status(200).json({ message: "Concentration found", data: concentration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteConcentration = async (req, res) => {
  try {
    const { concentrationId } = req.params;
    console.log("Attempting to delete concentration with ID:", concentrationId);
    const data = await Concentrations.findByIdAndDelete(concentrationId);

    if (!data) {
      console.error("Concentration not found for ID:", concentrationId);
      return res.status(404).json({ message: "Concentration not found" });
    }

    console.log("Concentration deleted successfully:", data);
    res.status(200).json({ message: "Concentration deleted successfully", data });
  } catch (error) {
    console.error("Error deleting Concentration:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const editConcentration = async (req, res) => {
  try {
    const { concentrationId } = req.params;
    console.log("Starting concentration update for ID:", concentrationId);

    if (!concentrationId || concentrationId.length !== 24) {
      console.error("Invalid ID format:", concentrationId);
      return res.status(400).json({ message: "Invalid ID format" });
    }

    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    let updatedData = { ...req.body };

    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "concentrations",
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

    console.log("Updating concentration in MongoDB...");
    const updatedConcentration = await Concentrations.findByIdAndUpdate(concentrationId, updatedData, {
      new: true,
    });

    if (!updatedConcentration) {
      console.error("Concentration not found after update attempt. ID:", concentrationId);
      return res.status(404).json({ message: "Concentration not found" });
    }

    console.log("Concentration successfully updated:", updatedConcentration);
    res.status(200).json(updatedConcentration);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};

const addConcentration = async (req, res) => {
  try {
    const { name, concentrationPic,description } = req.body;
    console.log("Data coming to the backend:", { name, concentrationPic, description });

    const newConcentration = new Concentrations({
      name,
      concentrationPic,
      description
    });

    await newConcentration.save();
    res.status(201).json(newConcentration);
  } catch (error) {
    console.error("Failed to save to database:", error);
    res.status(400).json({ message: error.message });
  }
};

export {
    getConcentrations,
  getSingleConcentration,
  deleteConcentration,
  editConcentration,
  addConcentration
};
