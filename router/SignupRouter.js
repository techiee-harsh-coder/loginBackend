const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Signup');

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this to an environment variable in production

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  console.log("Received data:", req.body); // Debugging log

  const { name, email, password } = req.body;

  // 🔹 Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // 🔹 Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // 🔹 Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    await user.save();

    // 🔹 Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, user: { id: user._id, name, email } });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
