const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionText: { type: String, required: true },
  answerText: { type: String, default: '' },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // teacher/admin who answered
  createdAt: { type: Date, default: Date.now },
  answeredAt: { type: Date },
});

module.exports = mongoose.model('Question', questionSchema);
