const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true, min: 0, max: 100 },
  term: { type: String, enum: ["Term 1", "Term 2", "Term 3"], required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
