// routes/payment.js
import express from "express";
import User from "../models/User.js";
import { activateMonthlyPro } from "../utils/activatePro.js";

const router = express.Router();

router.post("/payment-success", async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  await activateMonthlyPro(user);

  res.json({
    success: true,
    accessUntil: user.accessUntil,
  });
});

export default router;
