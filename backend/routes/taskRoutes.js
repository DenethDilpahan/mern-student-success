const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticate = require('../middleware/auth');

// Get all tasks for the logged-in student
router.get('/', authenticate, async (req, res) => {
  const tasks = await Task.find({ studentId: req.user.id });
  res.json(tasks);
});

// Add a new task
router.post('/', authenticate, async (req, res) => {
  const { title, subject, date } = req.body;

  const newTask = new Task({
    title,
    subject,
    date,
    studentId: req.user.id,
  });

  await newTask.save();
  res.status(201).json(newTask);
});

// Toggle done
router.patch('/:id', authenticate, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, studentId: req.user.id });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.done = !task.done;
  await task.save();
  res.json(task);
});

// Delete task
router.delete('/:id', authenticate, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, studentId: req.user.id });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
