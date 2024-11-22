import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User modeline referans
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      productPic: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  details: { type: Object, required: true }, // address burada bir obje olmalı
  status: { type: String, default: "Pending" },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Cash"], // Tanımlı değerler
    required: true,
  },
  payment: { type: Boolean, default: false },
  cardInfo: { type: Object, required: false }, // İsteğe bağlı
  date: { type: Date, default: Date.now },
});

export const Orders = mongoose.model("Orders", orderSchema);
