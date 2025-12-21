import Payment from "../../models/Payment.js";
import User from "../../models/User.js";

export const fakePay = async (req, res) => {
  try {
    const { templateId } = req.body;
    const userId = req.user.id;

    if (!templateId) {
      return res.status(400).json({ error: "Template ID is required" });
    }

    // 🔓 Unlock template for user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { unlockedTemplates: templateId },
    });

    // 💳 Create fake payment record
    await Payment.create({
      userId,
      templateId,
      amount: 999,
      method: "FAKE",
      status: "PAID",
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Fake payment error:", error);
    res.status(500).json({ error: "Fake payment failed" });
  }
};
