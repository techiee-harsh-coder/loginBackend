const express = require("express");
const Verse = require("../models/Verse1");

const router = express.Router();

// Get all verses
router.get("/api/chapter2", async (req, res) => {
  try {
    const verse1 = await Verse.find();
    res.json(verse1);
  } catch (error) {
    res.status(500).json({ message: "Error fetching verse1" });
  }
});

module.exports = router;
