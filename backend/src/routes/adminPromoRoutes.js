import express from "express";
import PromoCode from "../models/PromoCode.js";

const router = express.Router();

router.post("/generate-promo", async (req, res) => {
  const { secret } = req.body;

  if (secret !== process.env.PROMO_SECRET) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const countToday = await PromoCode.countDocuments({
    createdAt: { $gte: today },
  });

  if (countToday >= 20) {
    return res
      .status(400)
      .json({ message: "Daily promo limit (10) reached" });
  }

  const code =
    "VIP-" + Math.random().toString(36).substring(2, 7).toUpperCase();

  await PromoCode.create({ code });

  res.json({ success: true, code });
});

export default router;
