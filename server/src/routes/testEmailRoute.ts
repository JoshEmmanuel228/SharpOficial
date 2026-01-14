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
        requireTLS: true,
        connectionTimeout: 10000,
        family: 4, // Force IPv4
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        // 1. Verify connection
        await transporter.verify();
        console.log('[Test Email] Connection verified');

        // 2. Try sending an actual email
        const targetEmail = (req.query.to as string) || process.env.EMAIL_USER;

        const info = await transporter.sendMail({
            from: `"Test Debugger" <${process.env.EMAIL_USER}>`,
            to: targetEmail,
            subject: "Test Email from Sharp Official Debugger",
            text: "Si estás leyendo esto, la configuración de correo FUNCIONA correctamente.",
            html: "<h1>¡Éxito!</h1><p>El sistema de correo está funcionando.</p>"
        });

        console.log('[Test Email] Message sent:', info.messageId);

        res.json({
            status: 'success',
            message: `Email Sent! Connection verified AND email sent to ${targetEmail}`,
            messageId: info.messageId,
            user: user
        });
    } catch (error: any) {
        console.error('[Test Email] Failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'Email failed to send',
            step: error.command ? 'Sending' : 'Authentication',
            error: error.message
        });
    }
});

export default router;
