import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Phase-1: mark user as paid (mock)
router.post("/mark-paid", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isPaid: true, plan: "lifetime" },
      { new: true }
    ).select("-passwordHash");

    return res.json({
      success: true,
      message: "Payment marked successfully",
      user,
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
    });
  }
});

// Phase-1: check payment status
router.get("/check", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("isPaid plan");

    return res.json({
      isPaid: user?.isPaid === true,
      plan: user?.plan || null,
    });
  } catch (err) {
    console.error("Payment check error:", err);
    res.status(500).json({
      isPaid: false,
    });
  }
});

export default router;
