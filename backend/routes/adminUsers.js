const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/auth');

// All routes here require admin
router.use(authenticate);
router.use((req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, email, role, password } = req.body;
  if (!username || !email || !role || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'User already exists' });

  const newUser = new User({ username, email, role, password }); // Hash password in actual app!
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
});

// Update user role
router.patch('/:id', async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.role = role || user.role;
  await user.save();
  res.json({ message: 'User updated successfully' });
});

// Delete user
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
