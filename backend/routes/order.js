import express from 'express';
import { createOrder, createPaypalPayment, capturePayment, getOrders, getUserOrders } from '../controllers/order.js';

const router = express.Router();

// Yeni sipariş oluşturma
router.post('/create', createOrder);

// PayPal ödeme oluşturma
router.post('/paypal/create-payment', createPaypalPayment);

// PayPal ödeme başarıyla tamamlandığında
router.post('/paypal/capture-payment', capturePayment);

// Tüm siparişleri listeleme (admin için)
router.get('/', getOrders);

// Kullanıcı bazında siparişleri listeleme
router.get('/:userId', getUserOrders);

export default router;
