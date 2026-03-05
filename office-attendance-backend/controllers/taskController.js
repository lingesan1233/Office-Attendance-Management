const Task = require("../models/Task");
const mongoose = require("mongoose");


// Assign Task (Owner)
exports.assignTask = async (req, res) => {

  try {

    const { employeeId, title, description } = req.body;

    if (!employeeId || !title || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        message: "Invalid Employee ID"
      });
    }

    const task = await Task.create({
      employeeId,
      title,
      description,
      status: "Pending"
    });

    res.status(201).json({
      message: "Task assigned successfully",
      task
    });

  } catch (error) {

    console.log("Task Assign Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Get Tasks for Logged-in Employee
exports.getEmployeeTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      employeeId: req.user.id
    });

    res.json(tasks);

  } catch (error) {

    console.log("Fetch Tasks Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Employee Updates Task Status + Report
exports.updateTaskStatus = async (req, res) => {

  try {

    const { status, report } = req.body;

    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid Task ID"
      });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status, report },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {

    console.log("Update Task Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Get all tasks for Owner Dashboard
exports.getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("employeeId", "name email");

    res.json(tasks);

  } catch (error) {

    console.log("Fetch All Tasks Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};