const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new announcement
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
