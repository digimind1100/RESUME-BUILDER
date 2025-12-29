import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function usePaymentGuard(templateName = "") {
  const { user, setUser, token } = useAuth();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [checking, setChecking] = useState(false);

  // 🔐 FINAL: Date-based Pro check (30 days)
  const isPaid =
    user?.accessUntil &&
    new Date(user.accessUntil) > new Date();

  // 🔹 DEBUG
  console.log("🧩 usePaymentGuard render", {
    templateName,
    isPaid,
    accessUntil: user?.accessUntil,
  });

  // 🔹 Optional: auto-close modal when user becomes paid
  useEffect(() => {
    if (isPaid) {
      setShowPaymentModal(false);
    }
  }, [isPaid]);

  // 🔒 Guard trigger
  const requirePayment = () => {
    console.log("🔐 requirePayment called, isPaid =", isPaid);
    if (!isPaid) {
      setShowPaymentModal(true);
      return false;
    }
    return true;
  };

  // 💳 Called after successful payment
  const handlePaymentSuccess = async () => {
    console.log("🔥 handlePaymentSuccess CALLED");

    try {
      const res = await fetch(
        "http://localhost:3001/api/payments/mark-paid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: "monthly" }),
        }
      );

      const data = await res.json();
      console.log("✅ mark-paid response:", data);

      if (data.success && data.user) {
        // backend returns updated user with accessUntil
        setUser(data.user);
        setShowPaymentModal(false);
      }
    } catch (err) {
      console.error("❌ Payment failed:", err);
    }
  };

  return {
    isPaid,
    checking,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  };
}
