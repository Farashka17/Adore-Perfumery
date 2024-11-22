import express from 'express';
import { createOrder, getOrders, getUserOrders } from '../controllers/order.js';

const router = express.Router();

// Yeni sipariş oluşturma
router.post('/', createOrder);

// Tüm siparişleri listeleme (admin için)
router.get('/', getOrders);

// Kullanıcı bazında siparişleri listeleme
router.get('/:userId', getUserOrders);

export default router;
