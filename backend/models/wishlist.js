// models/Wishlist.js

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true, 
  },
  products: [{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      name:{
        type: String,
        // required: true
      },
      productPic:{
        type: String,
        // required: true
      }
}]
}, { timestamps: true }); 

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);

