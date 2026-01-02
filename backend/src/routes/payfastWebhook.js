import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { generatePayFastSignature } from "../utils/payfastSignature.js";

const router = express.Router();

router.post("/webhook", async (req, res) => {
  const data = req.body;

  // 1️⃣ Verify signature
  const receivedSignature = data.signature;
  delete data.signature;

  const calculatedSignature = generatePayFastSignature(
    data,
    process.env.PAYFAST_PASSPHRASE
  );

  if (receivedSignature !== calculatedSignature) {
    return res.status(400).send("Invalid signature");
  }

  // 2️⃣ Payment status check
  if (data.payment_status !== "COMPLETE") {
    return res.status(200).send("Payment not complete");
  }

  // 3️⃣ Identify user
  const userId = data.custom_str1;
  const user = await User.findById(userId);

  if (!user) return res.status(404).send("User not found");

  // 4️⃣ Unlock PRO instantly
  user.isPaid = true;
  user.plan = "PRO";
  user.paidAt = new Date();
  user.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await user.save();

  res.status(200).send("Payment processed");
});

export default router;
