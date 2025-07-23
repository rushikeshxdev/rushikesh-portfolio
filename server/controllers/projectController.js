// server/controllers/projectController.js
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    // Sort projects by 'order' field, then by 'dateCreated' (newest first)
    const projects = await Project.find().sort({ order: 1, dateCreated: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new project (for admin use, e.g., via a separate tool or manual insertion)
// @route   POST /api/projects
// @access  Private (implement authentication later if needed)
exports.addProject = async (req, res) => {
  const { title, description, imageUrl, githubLink, liveDemoLink, technologiesUsed, order } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Please include title and description' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      imageUrl,
      githubLink,
      liveDemoLink,
      technologiesUsed,
      order,
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
