import mongoose from 'mongoose';

// User Schema (Kullanıcılar için)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    default: 'user',
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  // Kullanıcının eklediği ürünler
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Product modeline referans
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  // Kullanıcının siparişleri
  orders: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Order modeline referans
      required: true
    },
    orderItems: [{
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
    }]
  }],
  wishlist: [  {
    productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Product modeline referans
    required: true
}
}],
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
