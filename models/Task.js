const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },

  report: {
    type: String,
    default: ""
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);