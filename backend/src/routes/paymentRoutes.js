import express from "express";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js"; // ✅ CORRECT

const router = express.Router();

router.post("/mark-paid", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { template } = req.body;

    if (!template) {
      return res.status(400).json({
        success: false,
        message: "Template missing",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        isPaid: true,
        paidTemplate: template,
        paidAt: new Date(),
      },
      { new: true }
    ).select("-passwordHash");

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("MARK PAID ERROR:", err); // 🔥 THIS WILL LOG REAL ISSUE
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
