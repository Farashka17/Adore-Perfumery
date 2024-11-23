import express from 'express';
import {
    addReview,
    getProductReviews,
    getUserReviews,
    // deleteReview,
} from '../controllers/review.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();


router.post('/add', protect, addReview);



router.get('/:productId/reviews',protect, getProductReviews);


router.get('/user/:userId',protect, getUserReviews);


// router.delete('/:reviewId', deleteReview);

export default router;
