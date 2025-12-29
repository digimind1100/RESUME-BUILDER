// utils/isPaid.js
export function isUserPaid(user) {
  if (!user?.accessUntil) return false;
  return new Date(user.accessUntil) > new Date();
}
