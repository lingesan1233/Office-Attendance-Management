const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  assignTask,
  getEmployeeTasks,
  updateTaskStatus,
  getAllTasks
} = require("../controllers/taskController");


// Owner assigns task to employee
router.post("/assign", authMiddleware, assignTask);


// Employee fetches their tasks
router.get("/employee", authMiddleware, getEmployeeTasks);


// Owner fetches all tasks with employee details
router.get("/all", authMiddleware, getAllTasks);


// Employee marks task as completed and submits report
router.put("/:id", authMiddleware, updateTaskStatus);


module.exports = router;