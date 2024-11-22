// import express from "express";
// import { createPayment, capturePayment ,cashPayment } from "../controllers/payment.js";

// const router = express.Router();

// router.post("/create-payment", createPayment); // Ödeme başlatma
// router.post("/capture-payment", capturePayment); // Ödeme tamamlama
// router.post('/cash-payment', cashPayment);

// export default router;

// import express from 'express';
// import { handleCashPayment, handleStripePayment } from '../controllers/payment.js';

// const router = express.Router();

// // Cash ödeme endpoint'i
// router.post('/cash', handleCashPayment);

// // Stripe ödeme endpoint'i
// router.post('/stripe', handleStripePayment);

// export default router;

import express from 'express';
import { createCashOrder } from '../controllers/payment.js';

const router = express.Router();

// Cash ödeme ile sipariş oluşturma route'u
router.post('/create-cash-order', createCashOrder);

export default router;