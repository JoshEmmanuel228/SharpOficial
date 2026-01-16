import { sendAppointmentEmail } from '../utils/emailService';
import dotenv from 'dotenv';
import path from 'path';

// Force load env if not already loaded by service
dotenv.config({ path: path.join(__dirname, '../../.env') });

const testEmail = async () => {
    console.log('🧪 Testing Resend Email Integration...');

    // Mock Appointment Data
    const mockAppointment = {
        name: 'Test User',
        email: 'mexaion018@gmail.com', // Sending to admin email as client for testing validation
        phone: '5512345678',
        address: 'Test Address 123',
        date: new Date(),
        time: '12:00 PM',
        product: 'Test Product',
        price: '1000'
    };

    try {
        await sendAppointmentEmail(mockAppointment);
        console.log('✅ Test script finished successfully.');
    } catch (error) {
        console.error('❌ Test script failed:', error);
    }
};

testEmail();
