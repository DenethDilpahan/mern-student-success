const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // or whatever your user model is named
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: String,
  date: Date,
  time: String,
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
