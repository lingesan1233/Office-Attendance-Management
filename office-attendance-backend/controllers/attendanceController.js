const Attendance = require("../models/Attendance");

exports.getAllAttendance = async (req, res) => {

    const data = await Attendance.find().populate("employeeId", "name email");

    res.json(data);

};