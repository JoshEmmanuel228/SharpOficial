import express from 'express';
import { createOrder, confirmClientEmail } from '../controllers/orderController';

const router = express.Router();

router.route('/').post(createOrder);
router.route('/:id/confirm-email').get(confirmClientEmail);

export default router;
