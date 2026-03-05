const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    date: {
        type: String
    },

    loginTime: {
        type: String
    },

    logoutTime: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Attendance", attendanceSchema);