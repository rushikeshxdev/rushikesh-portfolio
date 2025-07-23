// server/models/Achievement.js
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  prize: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: { // e.g., "Competition", "Award", "Recognition"
    type: String,
    default: 'Competition',
  },
  order: { // For custom sorting
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Achievement', AchievementSchema);