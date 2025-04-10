const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const verseRoutes = require("./routes/verseRoutes");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // If calling API from frontend

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', require('./router/authRouter'));
app.use('/api/auth', require('./router/SignupRouter'));
app.use("/verses",   require('./router/verseRoutes'));
app.use("/api/chapter2",  require('./router/verse1Routes'));

// Start server
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.listen(8000,()=>{
  console.log("Server is running on port 8000");
})
