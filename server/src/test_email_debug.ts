import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const testEmail = async () => {
    console.log('Testing email configuration...');
    console.log(`User: ${process.env.EMAIL_USER ? 'Set' : 'Not Set'}`);
    console.log(`Pass: ${process.env.EMAIL_PASS ? 'Set' : 'Not Set'}`);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        logger: true,
        debug: true,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        family: 4,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('Server is ready to take our messages');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'Test Email from Sharp Official Debugger',
            text: 'If you receive this, the email configuration is working!',
            html: '<b>If you receive this, the email configuration is working!</b>'
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

testEmail();
