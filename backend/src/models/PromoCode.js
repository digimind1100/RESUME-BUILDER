import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["FREE", "DISCOUNT"], required: true },
  value: { type: Number, required: true }, // 100 = free
  templateId: { type: String }, // optional (specific template)
  maxUses: { type: Number, default: 1 },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  expiresAt: { type: Date },
});

export default mongoose.model("PromoCode", promoCodeSchema);
