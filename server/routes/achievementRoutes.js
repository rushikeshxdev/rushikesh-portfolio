// server/routes/achievementRoutes.js
const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// GET /api/achievements - Get all achievements
router.get('/', achievementController.getAchievements);

// POST /api/achievements - Add a new achievement (for admin use)
router.post('/', achievementController.addAchievement);

module.exports = router;