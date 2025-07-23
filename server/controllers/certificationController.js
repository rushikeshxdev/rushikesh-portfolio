// server/controllers/certificationController.js
const Certification = require('../models/Certification');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
exports.getCertifications = async (req, res) => {
  try {
    // Sort certifications by dateIssued (newest first), then by order
    const certifications = await Certification.find().sort({ order: 1, dateIssued: -1 });
    res.json(certifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new certification (for admin use)
// @route   POST /api/certifications
// @access  Private
exports.addCertification = async (req, res) => {
  const { title, issuingBody, dateIssued, credentialUrl, order } = req.body;

  if (!title || !issuingBody || !dateIssued) {
    return res.status(400).json({ msg: 'Please include title, issuing body, and date issued' });
  }

  try {
    const newCertification = new Certification({
      title,
      issuingBody,
      dateIssued,
      credentialUrl,
      order,
    });

    const certification = await newCertification.save();
    res.status(201).json(certification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};