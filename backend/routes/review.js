import express from 'express';
import {
    addReview,
    getProductReviews,
    getUserReviews,
    deleteReview,
} from '../controllers/review.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Yeni bir inceleme ekle
router.post('/',protect, addReview);

// Bir ürünün incelemelerini al
router.get('/product/:productId',protect, getProductReviews);

// Bir kullanıcının incelemelerini al
router.get('/user/:userId',protect, getUserReviews);

// Bir incelemeyi sil
router.delete('/:reviewId', deleteReview);

export default router;
