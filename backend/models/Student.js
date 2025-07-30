const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
  },
  grade: {
    type: Number,
    required: [true, "Grade is required"],
    min: [1, "Grade cannot be less than 1"],
    max: [13, "Grade cannot be more than 13"],
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Email must be valid"],
    lowercase: true,
    trim: true,
  },
  subjects: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Student", studentSchema);
