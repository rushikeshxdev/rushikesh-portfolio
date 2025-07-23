// server/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET /api/projects - Get all projects
router.get('/', projectController.getProjects);

// POST /api/projects - Add a new project (for admin use)
router.post('/', projectController.addProject);

module.exports = router;