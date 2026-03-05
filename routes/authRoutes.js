const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  signupOwner,
  login,
  createEmployee,
  getEmployees,
  getProfile
} = require("../controllers/authController");


// Owner signup
router.post("/signup-owner", signupOwner);

// Login (owner + employee)
router.post("/login", login);

// Owner creates employee
router.post("/create-employee", authMiddleware, createEmployee);

// Owner gets employee list
router.get("/employees", authMiddleware, getEmployees);

// Employee profile
router.get("/profile", authMiddleware, getProfile);


module.exports = router;