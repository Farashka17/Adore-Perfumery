import express from 'express';
import { addToCart, updateCart, removeFromCart,getCart } from '../controllers/cart.js';
import { protect } from '../middleware/auth.js'; // Kullanıcının giriş yaptığını kontrol eden middleware

const router = express.Router();

// Sepete ürün ekleme
router.post('/add', protect, addToCart);

// Sepetteki ürünü güncelleme
router.put('/update', protect, updateCart);

// Sepetten ürün çıkarma
router.delete('/remove', protect, removeFromCart);

// Kullanıcının sepetini alma
router.get('/getCart',protect,  getCart);

export default router;
