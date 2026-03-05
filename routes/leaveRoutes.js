const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  requestLeave,
  getLeaves,
  updateLeaveStatus,
  getEmployeeLeaves
} = require("../controllers/leaveController");


// Employee request leave
router.post("/request", authMiddleware, requestLeave);

// Employee view their leave status
router.get("/my-leaves", authMiddleware, getEmployeeLeaves);

// Owner view all leave requests
router.get("/all", authMiddleware, getLeaves);

// Owner approve / reject leave
router.put("/:id", authMiddleware, updateLeaveStatus);

module.exports = router;