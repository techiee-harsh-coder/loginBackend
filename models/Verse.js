const mongoose = require("mongoose");

const verseSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  sanskrit: {
    type: String,
    required: true,
  },
  hindi: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the image
    required: false,
  },
  video: {
    type: String, // URL of the video (e.g., YouTube link or file path)
    required: false,
  },
});

module.exports = mongoose.model("Verse", verseSchema);
