const express = require('express');
const router = express.Router();
const ProgressEntry = require('../models/ProgressEntry');
const authenticateToken = require('../middleware/authMiddleware');

// GET all goals for the logged-in student
router.get('/', authenticateToken, async (req, res) => {
  try {
    const goals = await ProgressEntry.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new goal
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('User ID:', req.user?.id);
    console.log('Goal text:', req.body.goalText);
    console.log("Received:", req.body);

    const goal = new ProgressEntry({
      studentId: req.user.id,
      goalText: req.body.goalText
    });
    const saved = await goal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save goal' });
  }
});

// PUT mark as complete
router.put('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const updated = await ProgressEntry.findByIdAndUpdate(
      req.params.id,
      { isCompleted: true, completedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to mark complete' });
  }
});

module.exports = router;
