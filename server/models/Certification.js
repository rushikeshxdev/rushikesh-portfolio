// server/models/Certification.js
const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  issuingBody: {
    type: String,
    required: true,
    trim: true,
  },
  dateIssued: {
    type: Date,
    required: true,
  },
  credentialUrl: {
    type: String,
  },
  order: { // For custom sorting
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Certification', CertificationSchema);