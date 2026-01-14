// Automatically determine the API URL based on the current hostname
// This allows the app to work on localhost and local network IPs (e.g., 192.168.x.x) without manual changes.

const isProduction = process.env.NODE_ENV === 'production';

// If in production, use the environment variable. 
// If in dev, use the current hostname with port 5000.
// Helper to sanitize URL
const sanitizeUrl = (url) => url.endsWith('/') ? url.slice(0, -1) : url;

export const API_URL = process.env.REACT_APP_API_URL
    ? `${sanitizeUrl(process.env.REACT_APP_API_URL)}/api`
    : (isProduction ? '/api' : `http://${window.location.hostname}:5000/api`);

console.log('Environment:', process.env.NODE_ENV);
console.log('API URL configured as:', API_URL);

export const BASE_URL = process.env.REACT_APP_API_URL
    ? sanitizeUrl(process.env.REACT_APP_API_URL)
    : (isProduction ? '' : `http://${window.location.hostname}:5000`);
