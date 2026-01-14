// Automatically determine the API URL based on the current hostname
// This allows the app to work on localhost and local network IPs (e.g., 192.168.x.x) without manual changes.

const isProduction = process.env.NODE_ENV === 'production';

// Helper to sanitize URL
const sanitizeUrl = (url) => url.endsWith('/') ? url.slice(0, -1) : url;

export const API_URL = (() => {
    // 1. Force production URL if running on Render (failsafe)
    if (window.location.hostname.includes('sharpoficial.onrender.com')) {
        return 'https://sharpoficial.onrender.com/api';
    }

    // 2. Use Env Var if present (and not localhost if we are in production... optional check)
    if (process.env.REACT_APP_API_URL) {
        return `${sanitizeUrl(process.env.REACT_APP_API_URL)}/api`;
    }

    // 3. Fallback based on NODE_ENV
    return isProduction ? '/api' : `http://${window.location.hostname}:5000/api`;
})();

console.log('Environment:', process.env.NODE_ENV);
console.log('API URL configured as:', API_URL);

export const BASE_URL = (() => {
    if (window.location.hostname.includes('sharpoficial.onrender.com')) {
        return 'https://sharpoficial.onrender.com';
    }
    if (process.env.REACT_APP_API_URL) {
        return sanitizeUrl(process.env.REACT_APP_API_URL);
    }
    return isProduction ? '' : `http://${window.location.hostname}:5000`;
})();
