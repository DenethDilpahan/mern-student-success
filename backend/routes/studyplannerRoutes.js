const express = require('express');
const router = express.Router();
const StudyPlan = require('../models/StudyPlan');
const authenticate = require('../middleware/auth');

// Protect all study plan routes
router.use(authenticate);

// Add new study plan
router.post('/', async (req, res) => {
  try {
    const { subject, description, date, time } = req.body;
    const studyPlan = new StudyPlan({
      studentId: req.user.userId,  // comes from the auth middleware
      subject,
      description,
      date,
      time,
    });
    await studyPlan.save();
    res.status(201).json(studyPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create study plan' });
  }
});

// Get study plans for the logged-in student
router.get('/', async (req, res) => {
  try {
    const plans = await StudyPlan.find({ studentId: req.user.userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch study plans' });
  }
});

module.exports = router;
