import express from "express";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();

// ✅ MARK PAID (PERSIST PAYMENT)
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
      user,
    });
  } catch (err) {
    console.error("mark-paid error:", err);
    res.status(500).json({ success: false });
  }
});

// ✅ CHECK PAYMENT (USED AFTER LOGIN / REFRESH)
router.get("/check", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("isPaid plan");

    return res.json({
      isPaid: user?.isPaid === true,
      plan: user?.plan || null,
    });
  } catch (err) {
    console.error("check payment error:", err);
    res.status(500).json({ isPaid: false });
  }
});

export default router;
