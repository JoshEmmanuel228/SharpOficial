
import { sendAppointmentEmail } from './utils/emailService';

async function testEmail() {
    console.log('Testing email service...');
    try {
        await sendAppointmentEmail({
            name: 'Test Setup',
            phone: '5512345678',
            address: 'Calle Falsa 123',
            date: new Date(),
            time: '12:00 PM',
            product: 'Prueba de Sistema',
            price: 0
        });
        console.log('Email test completed.');
    } catch (error) {
        console.error('Email test failed:', error);
    }
}

testEmail();
