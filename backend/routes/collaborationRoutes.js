const express = require('express');
const router = express.Router();
const Collaboration = require('../models/Collaboration');
const authenticate = require('../middleware/auth');

// All routes need auth
router.use(authenticate);

// POST: Create a new Collaboration Post
router.post('/', async (req, res) => {
  const { postText } = req.body;
  if (!postText) return res.status(400).json({ error: 'Post text is required' });

  const post = new Collaboration({
    studentId: req.user.id,
    postText
  });
  await post.save();
  res.status(201).json(post);
});

// GET: Fetch all Collaboration Posts (Global Feed)
router.get('/', async (req, res) => {
  const posts = await Collaboration.find()
    .sort({ createdAt: -1 })
    .populate('studentId', 'name'); // get student names
  res.json(posts);
});

// PATCH: Connect with a Post (send collaboration request)
router.patch('/:id/connect', async (req, res) => {
  const post = await Collaboration.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (post.connections.includes(req.user.id)) {
    return res.status(400).json({ error: 'Already connected to this post' });
  }

  post.connections.push(req.user.id);
  await post.save();
  res.json({ message: 'Connected successfully', post });
});

// GET: Get posts the user is connected to
router.get('/my-connections', async (req, res) => {
  const posts = await Collaboration.find({ connections: req.user.id })
    .populate('studentId', 'name');
  res.json(posts);
});

module.exports = router;
