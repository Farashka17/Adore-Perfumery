import mongoose from "mongoose";

const fragranceFamilySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fragrancePic: {
    type: String,
  },
});

export const FragranceFamily = mongoose.model("FragranceFamily", fragranceFamilySchema);
