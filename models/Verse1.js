const mongoose = require("mongoose");

const VerseSchema = new mongoose.Schema({
  number: Number,
  sanskrit: String,
  hindi: String,
  english: String,
  image: String,
  video: String,
});

const Verse1 = mongoose.model("Verse1", VerseSchema);

module.exports = Verse1;
