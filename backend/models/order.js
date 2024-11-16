import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Product modeline referans
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'pending', // Sipariş durumu (pending, completed, etc.)
      enum: ['pending', 'completed', 'cancelled']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
export const Orders = mongoose.model('Orders', orderSchema);
