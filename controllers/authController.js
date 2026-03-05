const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Attendance = require("../models/Attendance");


// Owner Signup
exports.signupOwner = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist)
      return res.status(400).json({ message: "Owner already exists" });

    const hash = await bcrypt.hash(password, 10);

    const owner = await User.create({
      name,
      email,
      password: hash,
      role: "owner"
    });

    res.json({
      message: "Owner created successfully",
      owner
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

};



// Owner Creates Employee
exports.createEmployee = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist)
      return res.status(400).json({ message: "Employee already exists" });

    const hash = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email,
      password: hash,
      role: "employee"
    });

    res.json({
      message: "Employee created successfully",
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

};



// Login (Owner + Employee)
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );



    // Mark attendance automatically for employee
    if (user.role === "employee") {

      const today = new Date().toLocaleDateString();

      const alreadyMarked = await Attendance.findOne({
        employeeId: user._id,
        date: today
      });

      if (!alreadyMarked) {

        await Attendance.create({
          employeeId: user._id,
          date: today,
          loginTime: new Date().toLocaleTimeString()
        });

      }

    }

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

};



// Get All Employees (for Owner Dashboard)
exports.getEmployees = async (req, res) => {

  try {

    const employees = await User.find({ role: "employee" })
      .select("name email _id");

    res.json(employees);

  } catch (error) {

    console.log("Fetch Employees Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};
// Get logged-in user profile
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("name email role");

    res.json(user);

  } catch (error) {

    console.log("Profile Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};