const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middleware/authMiddleware");

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

module.exports = router;
