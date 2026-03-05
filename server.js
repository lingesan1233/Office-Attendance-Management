require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect Database
connectDB();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Office Attendance Management API Running");
});


// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});