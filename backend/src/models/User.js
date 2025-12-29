import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    // 🔐 PAYMENT STATUS (legacy + compatible)
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidTemplate: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    // ⏱️ NEW: TIME-BASED PRO ACCESS
    accessUntil: {
      type: Date,
      default: null,
    },

    plan: {
      type: String,
      default: null, // "monthly"
    },

    lastExpiryEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
