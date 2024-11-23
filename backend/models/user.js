import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: 
    { 
      type: String,
     required: true 
    },
    lastName: 
    { 
      type: String, 
      required: true 
    },
    email: 
    { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: 
    { 
      type: String, 
      required: true, 
      minLength: 8 
    },
    role: 
    { 
      type: String, 
      default: "user", 
      required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    orders: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        totalAmount: Number,
        details: Object, 
        paymentMethod: String,
        _id: mongoose.Schema.Types.ObjectId, 
      },
    ],
    reviews:[{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }],
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
