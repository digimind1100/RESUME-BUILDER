import PromoCode from "../../models/PromoCode.js";
import Payment from "../../models/Payment.js";
import User from "../../models/User.js";

export const applyPromoCode = async (req, res) => {
  try {
    const { code, templateId } = req.body;
    const userId = req.user.id;

    const promo = await PromoCode.findOne({ code });
    if (!promo) {
      return res.status(400).json({ error: "Invalid promo code" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { unlockedTemplates: templateId },
    });

    await Payment.create({
      userId,
      templateId,
      amount: 0,
      method: "PROMO",
      promoCode: code,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Apply promo error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
