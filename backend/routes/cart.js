import express from 'express';
import { addToCart, getCart, updateCart } from '../controllers/cart.js';
import { protect } from '../middleware/auth.js'; // Kullanıcı doğrulama (JWT vs.)

const router = express.Router();

// Kullanıcının sepetine ürün ekle
router.post('/add', protect, addToCart);

// Kullanıcının sepetini görüntüle
router.get('/', protect, getCart);

// Sepeti güncelleme
router.put('/update', protect, updateCart);

export default router;
