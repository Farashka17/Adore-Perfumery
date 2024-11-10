import { Volumes } from '../models/volume.js';
import cloudinary from 'cloudinary';



const getVolumes = async (req, res) => {
  try {
    const volumes = await Volumes.find();
    res.status(200).json({ message: "Volume families found", data: volumes });
  } catch (error) {
    console.error("Error fetching volumes:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleVolume = async (req, res) => {
  try {
    const { volumeId } = req.params;
    const volume = await Volumes.findById(volumeId);

    if (!volume)
      return res.status(404).json({ message: "Volume not found" });

    res.status(200).json({ message: "Volume found", data: volume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVolume = async (req, res) => {
  try {
    const { volumeId } = req.params;
    console.log("Attempting to delete volume with ID:", volumeId);
    const data = await Volumes.findByIdAndDelete(volumeId);

    if (!data) {
      console.error("Volume not found for ID:", volumeId);
      return res.status(404).json({ message: "Volume not found" });
    }

    console.log("Volume deleted successfully:", data);
    res.status(200).json({ message: "Volume deleted successfully", data });
  } catch (error) {
    console.error("Error deleting volume:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const editVolume = async (req, res) => {
  try {
    const { volumeId } = req.params;
    console.log("Starting volume update for ID:", volumeId);

    if (!volumeId || volumeId.length !== 24) {
      console.error("Invalid ID format:", volumeId);
      return res.status(400).json({ message: "Invalid ID format" });
    }

    console.log("Request Body:", req.body);
    // console.log("Request Files:", req.files);

    let updatedData = { ...req.body };

    // if (req.file) {
    //   console.log("Uploading image to Cloudinary...");
    //   try {
    //     const result = await cloudinary.uploader.upload(req.file.path, {
    //       folder: "volumes",
    //     });
    //     updatedData.volumePic = result.secure_url;
    //     console.log("Image successfully uploaded to Cloudinary:", result.secure_url);
    //   } catch (cloudinaryError) {
    //     console.error("Cloudinary upload error:", cloudinaryError);
    //     return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    //   }
    // } else {
    //   console.log("No file uploaded for Cloudinary.");
    // }

    console.log("Updating volume in MongoDB...");
    const updatedVolume = await Volumes.findByIdAndUpdate(volumeId, updatedData, {
      new: true,
    });

    if (!updatedVolume) {
      console.error("Volume not found after update attempt. ID:", volumeId);
      return res.status(404).json({ message: "Volume not found" });
    }

    console.log("Volume successfully updated:", updatedVolume);
    res.status(200).json(updatedVolume);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};

const addVolume = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("Backend'e gelen veriler:", { name });

    const newVolume = new Volumes({
      name
    });

    await newVolume.save();
    res.status(201).json(newVolume);
  } catch (error) {
    console.error("Veritabanına kaydedilemedi:", error);
    res.status(400).json({ message: error.message });
  }
};

export {
  getVolumes,
  getSingleVolume,
  deleteVolume,
  editVolume,
  addVolume
};
