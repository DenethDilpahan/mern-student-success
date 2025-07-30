const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const authenticate = require('../middleware/auth');

// All routes need auth
router.use(authenticate);

// Student: post a question
router.post('/', async (req, res) => {
  const { questionText } = req.body;
  if (!questionText) return res.status(400).json({ error: 'Question text is required' });

  const question = new Question({
    studentId: req.user.id,
    questionText,
  });
  await question.save();
  res.status(201).json(question);
});

// Student: get their questions with answers
router.get('/', async (req, res) => {
  const questions = await Question.find({ studentId: req.user.id })
    .sort({ createdAt: -1 });
  res.json(questions);
});

// Teacher/Admin: get all questions (for answering)
router.get('/all', async (req, res) => {
  if (!['admin', 'teacher'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
});

// Teacher/Admin: answer a question
router.patch('/:id/answer', async (req, res) => {
  if (!['admin', 'teacher'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { answerText } = req.body;
  if (!answerText) return res.status(400).json({ error: 'Answer text is required' });

  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ error: 'Question not found' });

  question.answerText = answerText;
  question.answeredBy = req.user.id;
  question.answeredAt = new Date();
  await question.save();
  res.json(question);
});

module.exports = router;
