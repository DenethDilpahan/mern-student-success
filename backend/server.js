const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("Connecting to:", process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);
const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
const questionRoutes = require('./routes/questionRoutes');
app.use('/api/questions', questionRoutes);
const studyplannerRoutes = require('./routes/studyplannerRoutes');
app.use('/api/studyplans', studyplannerRoutes);
const resourceRoutes = require('./routes/resourceRoutes');
app.use('/api/resources', resourceRoutes);
const progressRoutes = require('./routes/progressRoutes');
app.use('/api/progress', progressRoutes);
const collaborationRoutes = require('./routes/collaborationRoutes');
app.use('/api/collaborations', collaborationRoutes);
const adminUsersRoutes = require('./routes/adminUsers');
app.use('/api/admin/users', adminUsersRoutes);
const announcementRoutes = require('./routes/announcementRoutes');
app.use('/api/announcements', announcementRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log("Server running on http://0.0.0.0:5000");
});

