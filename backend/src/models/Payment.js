import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  templateId: String,
  amount: Number,
  method: String, // "FAKE" | "PROMO"
  promoCode: String,
  status: { type: String, default: "PAID" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
