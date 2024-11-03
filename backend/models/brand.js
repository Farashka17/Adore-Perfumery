import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  brandPic: {
    type: String,
  },
});

export const Brand = mongoose.model("Brand", brandSchema);
