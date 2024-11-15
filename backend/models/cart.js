  import mongoose from 'mongoose';

  // Cart Schema (Sepet için)
  const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User modeline referans
      required: true,
      unique: true // Her kullanıcı sadece bir sepete sahip olabilir
    },
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