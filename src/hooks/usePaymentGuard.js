import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function usePaymentGuard(templateName = "") {
  // 🔥 IMPORTANT: refreshUser added
  const { user, setUser, token, refreshUser } = useAuth();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [checking, setChecking] = useState(false);

  // 🔐 Date-based paid check (SINGLE SOURCE OF TRUTH)
  const isPaid =
    !!user &&
    user.isPaid === true &&
    user.accessUntil &&
    new Date(user.accessUntil).getTime() > Date.now();

  // 🔹 DEBUG (keep this)
  console.log("🧩 usePaymentGuard render", {
    templateName,
    isPaid,
    accessUntil: user?.accessUntil,
  });

  // 🔥 AUTO-REACT when user becomes paid
  useEffect(() => {
    if (isPaid) {
      console.log("mark-paid");
      setShowPaymentModal(false);
    }
  }, [isPaid]);

  // 🔒 Guard trigger (ONLY opens modal)
  const requirePayment = () => {
    console.log("🔐 requirePayment called, isPaid =", isPaid);
    if (!isPaid) {
      setShowPaymentModal(true);
      return false;
    }
    return true;
  };

  // 💳 Called after successful payment (EasyPaisa / manual)
  const handlePaymentSuccess = async () => {
    console.log("🔥 handlePaymentSuccess CALLED");

    try {
      const res = await fetch(
        "http://localhost:3001/api/payments/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: "lifetime" }),
        }
      );

      const data = await res.json();
      console.log("✅ mark-paid response:", data);

      if (data.success && data.user) {
        // 1️⃣ Immediate optimistic update
        setUser(data.user);

        // 2️⃣ CLOSE modal
        setShowPaymentModal(false);

        // 3️⃣ 🔥 FORCE fresh user from backend (THIS FIXES EVERYTHING)
        setTimeout(() => {
          refreshUser();
        }, 0);
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
