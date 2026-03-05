const Leave = require("../models/Leave");


// Employee request leave
exports.requestLeave = async (req, res) => {

  try {

    const { reason, days } = req.body;

    const leave = await Leave.create({
      employeeId: req.user.id,
      reason,
      days,
      status: "Pending"
    });

    res.json({
      message: "Leave request submitted",
      leave
    });

  } catch (error) {

    console.log("Leave Request Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Owner view leave requests
exports.getLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find()
      .populate("employeeId", "name email");

    res.json(leaves);

  } catch (error) {

    console.log("Fetch Leaves Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Owner approve / reject leave
exports.updateLeaveStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found"
      });
    }

    res.json({
      message: "Leave status updated",
      leave
    });

  } catch (error) {

    console.log("Update Leave Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



// Employee view their leave requests
exports.getEmployeeLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find({
      employeeId: req.user.id
    });

    res.json(leaves);

  } catch (error) {

    console.log("Employee Leaves Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};