const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Connected users
});

module.exports = mongoose.model('Collaboration', collaborationSchema);