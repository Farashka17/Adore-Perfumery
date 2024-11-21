import express from "express";
import { createPayment, capturePayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/create-payment", createPayment); // Ödeme başlatma
router.post("/capture-payment", capturePayment); // Ödeme tamamlama

export default router;
