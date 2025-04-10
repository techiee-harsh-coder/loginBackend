import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  photoURL: { type: String, default: "https://via.placeholder.com/150" },
  bio: { type: String, default: "" },
  phone: { type: String, unique: true, sparse: true }, 
  address: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Prevent overwriting the model if it's already compiled
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
