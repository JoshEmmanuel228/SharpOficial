import dotenv from 'dotenv';
dotenv.config();

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

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/cultures', cultureRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes); // Alias for Google Auth callback compatibility
app.use('/api/appointments', appointmentRoutes);
app.use('/api/orders', orderRoutes);

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
