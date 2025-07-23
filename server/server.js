// server/server.js
// Ensure dotenv is configured to load from the correct path in production as well
// For Render, environment variables are directly injected, so dotenv is primarily for local testing
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Configuration (More Robust) ---
// Get the frontend URL from environment variables
// Use a fallback for local development if FRONTEND_URL is not set (e.g., when running locally without .env)
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// Log the allowed origin for debugging purposes on Render
console.log(`CORS Allowing Origin: ${frontendUrl}`);

app.use(cors({
  origin: frontendUrl, // Directly set the allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Allow cookies to be sent (if needed in the future)
}));

// Middleware
app.use(express.json()); // Body parser for JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route (for testing if the server is running)
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// API Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));       // New Projects Route
app.use('/api/skills', require('./routes/skillRoutes'));           // New Skills Route
app.use('/api/achievements', require('./routes/achievementRoutes')); // New Achievements Route
app.use('/api/certifications', require('./routes/certificationRoutes')); // New Certifications Route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Access backend at: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});