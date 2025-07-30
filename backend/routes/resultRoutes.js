const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// GET all results
router.get("/", async (req, res) => {
  try {
    const { studentName, subject, term, year, page = 1, limit = 10, sort } = req.query;

    let filter = {};

    if (studentName) {
      filter.studentName = { $regex: studentName, $options: "i" };
    }

    if (subject) {
      filter.subject = { $regex: subject, $options: "i" };
    }

    if (term) {
      filter.term = term;
    }

    if (year) {
      filter.year = year;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    const totalResults = await Result.countDocuments(filter);

    const results = await Result.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      results,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum),
      totalResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD new result (Fixed)
router.post("/", async (req, res) => {
  try {
    const { studentName, subject, marks, term, year } = req.body;

    const newResult = new Result({
      studentName,
      subject,
      marks,
      term,
      year,
    });

    await newResult.save();
    res.status(201).json(newResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save result" });
  }
});

// DELETE result by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) return res.status(404).json({ error: "Result not found" });
    res.json({ message: "Result deleted", result: deletedResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
