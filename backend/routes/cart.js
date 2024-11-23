import express from 'express';
import { addToCart, updateCart, removeFromCart,getCart } from '../controllers/cart.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', protect, addToCart);


router.put('/update', protect, updateCart);


router.delete('/remove', protect, removeFromCart);


router.get('/getCart',  getCart);

export default router;
