import dotenv from 'dotenv';
// Load env vars immediately, before any other imports
const result = dotenv.config();
if (result.error) {
  console.log('⚠️  .env file not found or error loading it. Assuming env vars are set in system/container.');
}

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
// import connectDB from './config/db'; // Removed Mongo Connection
import cultureRoutes from './routes/cultureRoutes';
import chatRoutes from './routes/chatRoutes';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import orderRoutes from './routes/orderRoutes';
import testEmailRoutes from './routes/testEmailRoute';
import debugRoutes from './routes/debugRoute'; // Re-added import

// Verify critical env vars
console.log('----------------------------------------');
console.log('🚀 Server Starting...');
console.log(`Node Environment: ${process.env.NODE_ENV}`);
console.log(`Email User Configured: ${process.env.EMAIL_USER ? 'YES (' + process.env.EMAIL_USER.substring(0, 3) + '...)' : '❌ NO'}`);
console.log(`Email Pass Configured: ${process.env.EMAIL_PASS ? 'YES (Length: ' + process.env.EMAIL_PASS.length + ')' : '❌ NO'}`);
console.log('----------------------------------------');

// connectDB(); // Removed Mongo Connection

const app = express();
const httpServer = createServer(app);

// Allow CORS for development to allow access from local network IPs
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow any origin for local dev ease of use
    methods: ["GET", "POST"]
  }
});

app.use(cors()); // Default cors allows *
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: 'Sharp Official', timestamp: new Date() });
});

// Root route removed to allow static file serving


// Routes
app.use('/api/cultures', cultureRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes); // Alias for Google Auth callback compatibility
app.use('/api/appointments', appointmentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/test-email-config', testEmailRoutes);
app.use('/api/debug', debugRoutes); // Expose debug route

// Serve static files in production
// Serve static files (React App)
const path = require('path');
// Serve from local 'public' folder (works for both Docker and local if built)
// In production (Docker), client build is copied to 'server/public'
// In local, we can run 'prepare_deployment.ps1' to simulate this
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Use regex for catch-all route to avoid Express 5 parameter name error
app.get(/(.*)/, (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Force restart 5
