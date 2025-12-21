import express from "express";
import authMiddleware from "../../middleware/auth.js";

import { applyPromoCode } from "./applyPromo.js";
import { fakePay } from "./fakePay.js";

const router = express.Router();

// 🎟 Promo code
router.post("/apply-promo", authMiddleware, applyPromoCode);

// 💳 Fake payment
router.post("/fake-pay", authMiddleware, fakePay);

export default router;
