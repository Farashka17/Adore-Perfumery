// models/Wishlist.js

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User modeline referans
    required: true,
    unique: true, // Her kullanıcı için tek bir wishlist
  },
  products: [{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Product modeline referans
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
}, { timestamps: true }); // Oluşturma ve güncelleme zamanlarını otomatik ekler

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);

