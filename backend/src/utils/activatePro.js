// utils/activatePro.js

export function activateMonthlyPro(user) {
  const now = new Date();

  const accessUntil = new Date(now);
  accessUntil.setDate(accessUntil.getDate() + 30);

  user.isPaid = true;
  user.plan = "monthly";
  user.paidAt = now;
  user.accessUntil = accessUntil;
  user.lastExpiryEmailSent = false;

  return user.save();
}
