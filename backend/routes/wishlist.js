import express from 'express';
import { addToFavorite,removeFromFavorite,getWishlist } from '../controllers/wishlist.js'
import { protect } from '../middleware/auth.js'; // Kullanıcının giriş yaptığını kontrol eden middleware

const router = express.Router();

// // Sepete ürün ekleme
router.post('/addToFav', protect, addToFavorite);

// // // Sepetteki ürünü güncelleme
// router.put('/updateFav', protect, updateWishlist);

// Sepetten ürün çıkarma
router.delete('/removefromFav', protect, removeFromFavorite);

// // // Kullanıcının sepetini alma
router.get('/getFav', getWishlist);

export default router;
