import express from 'express';
import { createOrder, getOrders, getUserOrders,updateOrderStatus } from '../controllers/order.js';

const router = express.Router();


router.post('/', createOrder);

router.get('/', getOrders);

router.get('/:userId', getUserOrders);


router.patch('/update-status', updateOrderStatus);
export default router;
