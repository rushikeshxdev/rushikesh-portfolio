// server/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/400x250/1a202c/68d391?text=PROJECT_IMAGE',
  },
  githubLink: {
    type: String,
  },
  liveDemoLink: {
    type: String,
  },
  technologiesUsed: {
    type: [String], // Array of strings
    default: [],
  },
  order: { // For custom sorting
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);