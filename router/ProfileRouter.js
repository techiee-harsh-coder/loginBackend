// GET /api/user?email=user@example.com

import express from "express";
import User from "../models/Profile"; // adjust path as needed

const router = express.Router();

router.get("/profile", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email }).select("-password"); // hide password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
