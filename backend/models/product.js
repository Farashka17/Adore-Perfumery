import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    productPic: {
                type: String,
            },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                default: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
        }
    ],
    gender: {
        type: String,
        enum: ['Woman', 'Man', 'Unisex','Kids'], 
        required: true
    },
    concentration: {
        type: String,
        required: true
    },
    volume: {
        type: String,  
        required: true
    },
    fragranceFamily: {
        type: String,  
        required: true
    },
    newArrivals:{
        type: Boolean,
        default: false
    },
    topSelling:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
