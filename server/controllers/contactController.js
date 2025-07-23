// server/controllers/contactController.js
const ContactMessage = require('../models/contactMessage');

// @desc    Send a contact message
// @route   POST /api/contact
// @access  Public
exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newMessage = new ContactMessage({
      name,
      email,
      message
    });

    await newMessage.save();
    res.status(201).json({ msg: 'Message sent successfully!', message: newMessage });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};