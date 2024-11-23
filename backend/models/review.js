import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            // required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            // required: true,
        },
        name: {
            type: String,
            // required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },averageRating: { type: Number, default: 0 }, 
        reviewCount: { type: Number, default: 0 }, 
    },
    { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
