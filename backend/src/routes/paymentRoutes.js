import express from "express";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/auth.js";
import Payment from "../models/Payment.js";
import { activateMonthlyPro } from "../utils/activatePro.js";


const router = express.Router();

/**
 * =================================================
 * USER: SUBMIT PAYMENT (EasyPaisa / JazzCash etc)
 * =================================================
 */
router.post("/submit", requireAuth, async (req, res) => {
  try {
    const { method, amount, transactionId } = req.body;

    if (!method || !amount || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // prevent duplicate pending payment
    const existing = await Payment.findOne({
      userId: req.user.id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Payment already pending approval",
      });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      amount,
      method,
      transactionId,
      status: "pending",
    });

    return res.json({
      success: true,
      message: "Payment submitted for verification",
      paymentId: payment._id,
    });
  } catch (err) {
    console.error("payment submit error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * =================================================
 * USER: CHECK PAYMENT STATUS (after refresh/login)
 * =================================================
 */
router.get("/check", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "isPaid plan accessUntil"
    );

    return res.json({
      success: true,
      isPaid: user?.isPaid === true,
      plan: user?.plan || null,
      accessUntil: user?.accessUntil || null,
    });
  } catch (err) {
    console.error("check payment error:", err);
    res.status(500).json({ success: false });
  }
});

/**
 * =================================================
 * ADMIN: GET ALL PENDING PAYMENTS
 * =================================================
 */
router.get(
  "/admin/pending",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const payments = await Payment.find({ status: "pending" })
        .populate("userId", "email fullName")
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        payments,
      });
    } catch (err) {
      console.error("pending payments error:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

/**
 * =================================================
 * ADMIN: APPROVE PAYMENT (MANUAL)
 * =================================================
 */
router.post(
  "/admin/approve",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { paymentId } = req.body;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: "Payment ID required",
        });
      }

      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      if (payment.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "Payment already processed",
        });
      }

      const user = await User.findById(payment.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // ✅ activate pro safely
      await activateMonthlyPro(user);

      // ✅ mark payment approved
      payment.status = "approved";
      await payment.save();

      return res.json({
        success: true,
        message: "Payment approved & Pro activated",
      });
    } catch (err) {
      console.error("approve payment error:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

export default router;
