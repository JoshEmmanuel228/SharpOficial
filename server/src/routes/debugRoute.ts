import express from 'express';
import { sendOrderEmail } from '../utils/emailService';

const router = express.Router();

router.get('/force-test', async (req, res) => {
    try {
        console.log('[Debug] Forcing test email...');

        const testOrder = {
            _id: 'TEST-' + Date.now(),
            user: {
                fullName: 'Test Admin User',
                email: process.env.EMAIL_USER, // Send to self
                phone: '5555555555',
                address: 'Test Address',
                city: 'Test City',
                zipCode: '00000',
                deliveryDate: '2023-01-01',
                deliveryTime: '12:00',
                deliveryStation: 'Test Station'
            },
            cartItems: [
                {
                    name: 'Test Product',
                    quantity: 1,
                    price: 100,
                    imageUrls: ['https://via.placeholder.com/150']
                }
            ],
            total: 100,
            paymentMethod: 'Test'
        };

        await sendOrderEmail(testOrder);
        res.send('Email test initiated. Check server logs and inbox.');
    } catch (error: any) {
        res.status(500).send('Error launching test: ' + error.message);
    }
});

export default router;
