import mongoose from "mongoose";

const fragranceFamilySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fragrancePic: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    default: "A fragrance family that consists of various fragrances."
  }
});

export const FragranceFamily = mongoose.model("FragranceFamily", fragranceFamilySchema);
