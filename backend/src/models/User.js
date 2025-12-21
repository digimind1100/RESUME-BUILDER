import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // 🔥 VERY IMPORTANT
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
}

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
