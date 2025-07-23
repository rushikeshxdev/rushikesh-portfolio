// server/routes/certificationRoutes.js
const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

// GET /api/certifications - Get all certifications
router.get('/', certificationController.getCertifications);

// POST /api/certifications - Add a new certification (for admin use)
router.post('/', certificationController.addCertification);

module.exports = router;