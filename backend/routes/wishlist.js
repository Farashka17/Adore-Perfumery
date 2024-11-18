// routes/wishlistRoutes.js
import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlist.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", protect , addToWishlist); // Favorilere ürün ekle
router.post("/remove", protect , removeFromWishlist); // Favorilerden ürün çıkar
router.get("/", getWishlist); // Kullanıcının favori ürünlerini al

export default router;
