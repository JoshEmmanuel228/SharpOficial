import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Appointment from '../models/Appointment';
import { sendAppointmentEmail, sendAppointmentClientEmail } from '../utils/emailService';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, address, date, time, product, price } = req.body;

    console.log('[DEBUG] Appointment Request Body:', req.body);
    console.log('[DEBUG] Fields check:', { name, email, phone, address, date, time });

    if (!name || !email || !phone || !address || !date || !time) {
        res.status(400);
        throw new Error('Por favor complete todos los campos, incluyendo el correo electrónico');
    }

    const appointment = await Appointment.create({
        name,
        email,
        phone,
        address,
        date,
        time,
        product,
        price,
        status: 'Pending',
        createdAt: new Date()
    });

    if (appointment) {
        // Send emails asynchronously
        // Send emails asynchronously
        // Admin notification
        sendAppointmentEmail(appointment).catch(err => console.error('Error sending admin email:', err));

        // Client confirmation
        // Import needed if not already imported at top, but we already have sendAppointmentEmail imported.
        // We need sendAppointmentClientEmail too.
        import('../utils/emailService').then(({ sendAppointmentClientEmail }) => {
            sendAppointmentClientEmail(appointment).catch(err => console.error('Error sending client email:', err));
        });

        res.status(201).json({
            _id: appointment._id,
            name: appointment.name,
            product: appointment.product,
            date: appointment.date,
            time: appointment.time,
            message: 'Cita agendada exitosamente'
        });
    } else {
        res.status(400);
        throw new Error('Datos de cita inválidos');
    }
});
