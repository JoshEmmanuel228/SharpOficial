import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { sendOrderEmail, sendClientConfirmationEmail } from '../utils/emailService';
import { FileStore } from '../utils/fileStore';
import { IOrder } from '../models/Order';

const orderStore = new FileStore<IOrder>('orders.json');

// @desc    Create new order and send email
// @route   POST /api/orders
// @access  Public
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const { user, cartItems, total, paymentMethod } = req.body;

    if (!user || !cartItems || cartItems.length === 0) {
        res.status(400);
        throw new Error('No order items or user data');
    }

    // Create and save new order
    const orderData: IOrder = {
        user,
        cartItems,
        total,
        paymentMethod,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    const order = await orderStore.create(orderData);

    const emailData = {
        _id: order._id,
        user,
        cartItems,
        total,
        paymentMethod
    };


    // Send email notification (Dual send: Admin + Client)
    await sendOrderEmail(emailData);

    // Confirmation logic is now handled inside sendOrderEmail in parallel.
    // Explicit call removed to avoid redundant sending, as sendOrderEmail handles both streams.

    res.status(201).json({
        success: true,
        message: 'Order created and email sent successfully',
        order: order
    });
});

// @desc    Confirm order and send email to client (Admin Action)
// @route   GET /api/orders/:id/confirm-email
// @access  Public (Obscured by ID)
export const confirmClientEmail = asyncHandler(async (req: Request, res: Response) => {
    const order = await orderStore.findOne({ _id: req.params.id });

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    const result = await sendClientConfirmationEmail(order);

    if (result) {
        await orderStore.findOneAndUpdate({ _id: req.params.id }, { status: 'Confirmed (Email Sent)' });
        res.send(`
            <div style="font-family: Arial; text-align: center; margin-top: 50px;">
                <h1 style="color: green;">✅ Correo enviado al cliente correctamente</h1>
                <p>Se ha notificado a <strong>${order.user.fullName}</strong> (${order.user.email})</p>
                <p>Status actualizado.</p>
            </div>
        `);
    } else {
        res.status(500).send('❌ Error enviando el correo. Revisa los logs del servidor.');
    }
});

