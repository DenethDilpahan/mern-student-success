const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = new User({ username, email, password, role: role || "student" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: "Server error" });
  }
});

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// LOGIN route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include role
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token payload:", { userId: user._id, role: user.role });

    res.json({ token,userId: user._id, username: user.username, role: user.role });
  } catch (err) {
  console.error("Login error:", err); 
  res.status(500).json({ error: "Server error" });
  }
});

router.delete("/delete-by-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    res.json({ message: `User with email '${email}' deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
