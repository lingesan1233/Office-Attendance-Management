const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const { getAllAttendance } = require("../controllers/attendanceController");

router.get("/", auth, getAllAttendance);

module.exports = router;