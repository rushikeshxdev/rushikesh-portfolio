// server/controllers/achievementController.js
const Achievement = require('../models/Achievement');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
exports.getAchievements = async (req, res) => {
  try {
    // Sort achievements by date (newest first), then by order
    const achievements = await Achievement.find().sort({ order: 1, date: -1 });
    res.json(achievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new achievement (for admin use)
// @route   POST /api/achievements
// @access  Private
exports.addAchievement = async (req, res) => {
  const { title, description, prize, date, type, order } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Please include title and description' });
  }

  try {
    const newAchievement = new Achievement({
      title,
      description,
      prize,
      date,
      type,
      order,
    });

    const achievement = await newAchievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};