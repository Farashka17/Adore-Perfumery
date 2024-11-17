import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be greater than or equal to 0']
  },
  address:{
    type: String,
    required: true
  },
  status: {
    type: String,
    required:true,
    default: 'pending',
    enum: ['pending', 'completed', 'cancelled']
  },
  paymentMethod:{
    type: String,
    required: true,
    // enum: ['cash', 'card', 'online']
  },
  payment:{
    type:Boolean,
    required: true,
    default: false
  },
  date:{
    type: Number,
    required:true
  }
}, { timestamps: true });

export const Orders = mongoose.model('Orders', orderSchema);
