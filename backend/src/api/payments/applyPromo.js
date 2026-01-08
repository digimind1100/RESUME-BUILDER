import PromoCode from "../../models/PromoCode.js";
import Payment from "../../models/Payment.js";
import User from "../../models/User.js";
import { activatePromoPro } from "../../utils/activatePro.js";

export const applyPromoCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    // 1️⃣ Validate promo code
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

    // 2️⃣ Load user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3️⃣ Create payment record (audit only)
    await Payment.create({
      userId: user._id,
      amount: 0,
      method: "promo",
      promoCode: promo.code,
      status: "approved",
    });

    // 4️⃣ Activate PROMO (24 hours)
    await activatePromoPro(user);

    // 5️⃣ Mark promo as used
    promo.isUsed = true;
    promo.usedBy = user._id;
    promo.usedAt = new Date();
    await promo.save();

    // 6️⃣ Respond with UPDATED user
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
        paidAt: user.paidAt,
      },
    });
  } catch (err) {
    console.error("Apply promo error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
