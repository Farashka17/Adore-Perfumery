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
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        default: "User",
        required: true
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
        enum: ['Male', 'Female', 'Unisex','Kids'],  // örnek değerler
        required: true
    },
    concentration: {
        type: String,
        required: true
    },
    volume: {
        type: Number,  // Örneğin mililitre cinsinden saklanabilir
        required: true
    },
    fragranceFamily: {
        type: String,  // Örneğin "Floral", "Woody", "Citrus" gibi değerler
        required: true
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
