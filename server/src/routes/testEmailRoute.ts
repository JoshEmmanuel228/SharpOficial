import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const router = express.Router();

// @route   GET /api/test-email-config
// @desc    Test if email credentials work
// @access  Public
router.get('/', async (req, res) => {
    console.log('[Test Email] Checking configuration...');

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS ? '******' : 'MISSING';

    if (!user || !process.env.EMAIL_PASS) {
        return res.status(500).json({
            status: 'error',
            message: 'Missing environment variables',
            debug: { user, pass }
        });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('[Test Email] Connection successful');
        res.json({
            status: 'success',
            message: 'SMTP Connection established successfully',
            user: user
        });
    } catch (error: any) {
        console.error('[Test Email] Connection failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'SMTP Connection failed',
            error: error.message
        });
    }
});

export default router;
