// server/models/Skill.js
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: { // e.g., "Frontend", "Backend", "Database", "Tools"
    type: String,
    required: true,
    trim: true,
  },
  level: { // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate',
  },
  order: { // For custom sorting
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Skill', SkillSchema);