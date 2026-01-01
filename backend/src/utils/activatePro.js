// backend/src/utils/activatePro.js

/**
 * Activate Monthly Pro plan for a user
 * Duration: 30 days
 */
export async function activateMonthlyPro(user) {
  if (!user) {
    throw new Error("User not provided to activateMonthlyPro");
  }

  const now = new Date();

  const accessUntil = new Date(now);
  accessUntil.setDate(accessUntil.getDate() + 30);

  user.isPaid = true;
  user.plan = "monthly";
  user.paidAt = now;
  user.accessUntil = accessUntil;

  // reset expiry email flag if you use cron
  user.lastExpiryEmailSent = false;

  await user.save();
  return user;
}
