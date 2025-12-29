import express from "express";
import PromoCode from "../models/PromoCode.js";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/redeem", requireAuth, async (req, res) => {
  try {
    const { code } = req.body;

    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      isUsed: false,
    });

    if (!promo) {
      return res.status(400).json({ message: "Invalid or already used promo code" });
    }

    const user = await User.findById(req.user.id);

    // Activate 1-day premium
    user.isPaid = true;
    user.planExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.save();

    promo.isUsed = true;
    promo.usedBy = user._id;
    promo.usedAt = new Date();

    await promo.save();

    res.json({
      success: true,
      message: "Premium activated for 24 hours",
      expiresAt: user.planExpiresAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Promo redemption failed" });
  }
});

export default router;
