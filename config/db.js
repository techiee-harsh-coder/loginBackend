const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Define schema (optional: extract this to models/verse.js later)
    const verseSchema = new mongoose.Schema({
      number: Number,
      sanskrit: String,
      hindi: String,
      english: String,
      image: String,
      video: String,
    });

    const Verse = mongoose.model("Verse", verseSchema);   // Chapter 1
    const Verse1 = mongoose.model("Verse1", verseSchema); // Chapter 2

    // Utility function to update UTF-8 encoding
    const updateEncoding = async (Model, label) => {
      const verses = await Model.find();
      for (let verse of verses) {
        await Model.updateOne(
          { _id: verse._id },
          {
            $set: {
              sanskrit: Buffer.from(verse.sanskrit || "", "utf-8").toString(),
              hindi: Buffer.from(verse.hindi || "", "utf-8").toString(),
              english: Buffer.from(verse.english || "", "utf-8").toString(),
            },
          }
        );
      }
      console.log(`✅ UTF-8 encoding updated for ${label}`);
    };

    // Apply to both collections
    await updateEncoding(Verse, "Chapter 1");
    await updateEncoding(Verse1, "Chapter 2");
    
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
