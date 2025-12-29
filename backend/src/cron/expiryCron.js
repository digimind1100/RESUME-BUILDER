import cron from "node-cron";
import User from "../models/User.js";
import sendExpiryEmail from "../utils/sendExpiryEmail.js";

console.log("⏰ Expiry cron loaded");

cron.schedule("* * * * *", async () => {
  console.log("🕒 Cron tick:", new Date().toISOString());

  try {
    const now = new Date();

    const users = await User.find({
      isPaid: true,
      accessUntil: { $lte: now },
      lastExpiryEmailSent: false,
    });

    console.log("🔍 Expired users found:", users.length);

    for (const user of users) {
      await sendExpiryEmail(user);

      user.lastExpiryEmailSent = true;
      await user.save();

      console.log("📧 Expiry email sent to:", user.email);
    }
  } catch (err) {
    console.error("❌ Expiry cron error:", err);
  }
});
