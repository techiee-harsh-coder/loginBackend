const express = require("express");
const Verse = require("../models/Verse");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const verses = await Verse.find();
    res.json("verses");
  } catch (error) {
    res.status(500).json({ message: "Error fetching verses" });
  }
});

router.post("/", async (req, res) => {
  const { number, sanskrit, hindi, english, image, video } = req.body;

  if (!number || !sanskrit || !hindi || !english) {
    return res.status(400).json({ message: "All fields except image/video are required" });
  }

  try {
    const newVerse = new Verse({ number, sanskrit, hindi, english, image, video });
    await newVerse.save();
    res.status(201).json(newVerse);
  } catch (error) {
    res.status(500).json({ message: "Error saving verse" });
  }
});

module.exports = router;
