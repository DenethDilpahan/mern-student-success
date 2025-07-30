const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Video', 'Article'], required: true },
  subject: { type: String, required: true }, // Optional: Math, Science, English, etc.
  grade: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
