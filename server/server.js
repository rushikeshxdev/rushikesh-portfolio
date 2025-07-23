// server/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For Cross-Origin Resource Sharing

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173', // Your frontend development URL
  // Add your deployed frontend URL here when ready for production
  // 'https://your-deployed-frontend.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware
app.use(express.json()); // Body parser to parse JSON request bodies

// MongoDB Connection
// The MONGO_URI is loaded from the .env file
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
