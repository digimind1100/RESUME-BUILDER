import express from "express";
import PromoCode from "../models/PromoCode.js";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js";
import { activatePromoPro } from "../utils/activatePro.js";

const router = express.Router();

router.post("/redeem", requireAuth, async (req, res) => {
  try {
    const { code } = req.body;

    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      isUsed: false,
    });

    if (!promo) {
      return res.status(400).json({
        success: false,
        message: "Invalid or already used promo code",
      });
    }

    const user = await User.findById(req.user.id);

    // ✅ USE CENTRAL LOGIC
    await activatePromoPro(user);

    promo.isUsed = true;
    promo.usedBy = user._id;
    promo.usedAt = new Date();
    await promo.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isPaid: user.isPaid,
        plan: user.plan,
        accessUntil: user.accessUntil,
      },
    });
  } catch (err) {
    console.error("Promo redeem error:", err);
    res.status(500).json({ success: false, message: "Promo redemption failed" });
  }
});

export default router;
