const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(authMiddleware);
// GET all students
// GET all students (with optional filters, pagination, sorting)
// GET all students (with filters, pagination, sorting, and total count)
router.get("/", authMiddleware, roleMiddleware(["admin", "student"]), async (req, res) => {
  try {
    const { name, grade, subject, page = 1, limit = 10, sort } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (grade) {
      filter.grade = grade;
    }

    if (subject) {
      filter.subjects = { $in: [subject] };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting logic
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    // Total number of matching students
    const totalStudents = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      students,
      currentPage: pageNum,
      totalPages: Math.ceil(totalStudents / limitNum),
      totalStudents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// POST add new student
router.post("/", authMiddleware, roleMiddleware(["admin"]),async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: "Server error" });
  }
});


// GET single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE student by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted", student: deletedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE student by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // 🔥 Ensures update is validated
    });
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;