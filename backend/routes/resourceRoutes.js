const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// GET all resources
router.get('/', async (req, res) => {
  try {
    const { grade, subject } = req.query;
    console.log("Grade query:", grade);
    console.log("Subject query:", subject);

    let query = {};
    if (grade) query.grade = grade;
    if (subject) query.subject = subject;

    console.log("MongoDB query:", query);

    const resources = await Resource.find(query);
    console.log("Found resources:", resources);

    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});



// POST new resource (admin only in the future)
router.post('/', async (req, res) => {
  try {
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      type: req.body.type,
      grade: req.body.grade,
      subject: req.body.subject
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error("Error saving resource:", error);
    res.status(500).json({ error: 'Failed to add resource' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});


module.exports = router;
