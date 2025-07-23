// server/controllers/skillController.js
const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
  try {
    // Sort skills by category, then by order, then by name
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new skill (for admin use)
// @route   POST /api/skills
// @access  Private
exports.addSkill = async (req, res) => {
  const { name, category, level, order } = req.body;

  if (!name || !category) {
    return res.status(400).json({ msg: 'Please include name and category' });
  }

  try {
    const newSkill = new Skill({
      name,
      category,
      level,
      order,
    });

    const skill = await newSkill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
