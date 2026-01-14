const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to read from the root of the server directory
const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

const testEmail = async () => {
    console.log('--- STARTING EMAIL DEBUG ---');
    console.log(`Loading .env from: ${envPath}`);
    console.log(`EMAIL_USER Present: ${!!process.env.EMAIL_USER}`);
    console.log(`EMAIL_PASS Present: ${!!process.env.EMAIL_PASS}`);

    if (process.env.EMAIL_USER) {
        console.log(`EMAIL_USER value (masked): ${process.env.EMAIL_USER.substring(0, 3)}***@***`);
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        logger: true,
        debug: true,
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
        console.log('Verifying settings...');
        await transporter.verify();
        console.log('SUCCESS: Transporter verification passed!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test Email Debug',
            text: 'It works!',
        });

        console.log('SUCCESS: Message sent: %s', info.messageId);
    } catch (error) {
        console.error('FAILURE: Error occurred details below:');
        console.error(error);
    }
};

testEmail();
