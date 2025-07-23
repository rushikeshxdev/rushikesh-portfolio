// server/routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// GET /api/skills - Get all skills
router.get('/', skillController.getSkills);

// POST /api/skills - Add a new skill (for admin use)
router.post('/', skillController.addSkill);

module.exports = router;