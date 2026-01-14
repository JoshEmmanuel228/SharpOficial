import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Force load env from correct path relative to this script
const envPath = path.resolve(__dirname, '../../.env');
console.log(`[Diagnostic] Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('[Diagnostic] Error loading .env:', result.error);
}

// Print redacted env vars to verify loading
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

console.log(`[Diagnostic] Env Check:`);
console.log(`- EMAIL_USER: ${user ? user.substring(0, 3) + '***' + user.substring(user.indexOf('@')) : 'UNDEFINED'}`);
console.log(`- EMAIL_PASS: ${pass ? (pass.length > 5 ? 'SET (Length: ' + pass.length + ')' : 'SHORT/INVALID') : 'UNDEFINED'}`);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
    auth: {
        user: user,
        pass: pass
    }
} as any);

async function verifyConnection() {
    try {
        console.log('[Diagnostic] Attempting SMTP Connection...');
        await transporter.verify();
        console.log('✅ [Diagnostic] SMTP Connection Successful! Credentials are valid.');
    } catch (error) {
        console.error('❌ [Diagnostic] SMTP Connection FAILED:', error);
    }
}

verifyConnection();
