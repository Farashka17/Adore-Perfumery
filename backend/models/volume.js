import mongoose from "mongoose";

const volumeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
 

});

export const Volumes = mongoose.model("Volumes", volumeSchema);
