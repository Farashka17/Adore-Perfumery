  import mongoose from 'mongoose';

 
  const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
      unique: true 
    },
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
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

  export const Cart = mongoose.model('Cart', cartSchema);