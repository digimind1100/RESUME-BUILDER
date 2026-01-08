// src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/jwt.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

// Helper to shape user object for frontend
function toPublicUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isPaid: user.isPaid,
    accessUntil: user.accessUntil, // ⭐ VERY IMPORTANT
    plan: user.plan,
  };
}


/* ---------- SIGNUP ---------- */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role: "user",
    });

    const token = createToken(user);

    return res.status(201).json({
      success: true,
      user: toPublicUser(user),
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ---------- LOGIN ---------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);

    return res.json({
      success: true,
      user: toPublicUser(user),
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ---------- ME ---------- */
// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "_id fullName email role isPaid paidTemplate paidAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isPaid: user.isPaid,
        paidTemplate: user.paidTemplate,
        paidAt: user.paidAt,
      },
    });
  } catch (err) {
    console.error("ME ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



export default router;
