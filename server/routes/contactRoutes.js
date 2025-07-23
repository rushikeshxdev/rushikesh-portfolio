// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Correct path to controller

// POST /api/contact - Send a contact message
router.post('/', contactController.sendContactMessage);

module.exports = router;
