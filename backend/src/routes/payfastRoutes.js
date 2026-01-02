import express from "express";
import { generatePayFastSignature } from "../utils/payfastSignature.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-payment", requireAuth, async (req, res) => {
  const user = req.user;

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: process.env.PAYFAST_RETURN_URL,
    cancel_url: process.env.PAYFAST_CANCEL_URL,
    notify_url: process.env.PAYFAST_NOTIFY_URL,

    name_first: user.fullName,
    email_address: user.email,

    amount: "1000.00", // PRO price
    item_name: "Resume Builder PRO",
    custom_str1: user.id, // user reference
  };

  const signature = generatePayFastSignature(
    paymentData,
    process.env.PAYFAST_PASSPHRASE
  );

  paymentData.signature = signature;

  res.json({
    success: true,
    paymentUrl: "https://www.payfast.co.za/eng/process",
    paymentData,
  });
});

export default router;
