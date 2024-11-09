import mongoose from "mongoose";

const concentrationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  concentrationPic: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    default: "This fragrance offers a balanced concentration, ensuring a lasting yet subtle experience."
  }
});

export const Concentrations = mongoose.model("Concentrations", concentrationSchema);
