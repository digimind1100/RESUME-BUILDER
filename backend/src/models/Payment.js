import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional: used for resume templates etc
    templateId: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    // PAYMENT TYPE
    method: {
      type: String,
      enum: ["easypaisa", "jazzcash", "sadapay", "promo", "fake"],
      required: true,
    },

    // Manual payment proof
    transactionId: {
      type: String,
      default: null,
      unique: true,
      sparse: true, // 🔥 allows null + unique
    },

    // Promo support
    promoCode: {
      type: String,
      default: null,
    },

    // Payment lifecycle
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
