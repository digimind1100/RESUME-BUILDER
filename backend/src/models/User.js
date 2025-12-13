const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // 🔐 payment fields
    isPaid: { type: Boolean, default: false },
    plan: {
      type: String,
      enum: ["free", "lifetime"],
      default: "free",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
