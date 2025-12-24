import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function usePaymentGuard(templateName) {
  const { user, setUser, token } = useAuth();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [checking, setChecking] = useState(true);

  // 🔹 DEBUG: hook render
  console.log("🧩 usePaymentGuard render", {
    templateName,
    user: !!user,
    token: !!token,
  });

  // 🔹 Re-check payment status from backend
  useEffect(() => {
    if (!user || !token) {
      console.log("⛔ Skipping payment check (no user/token)");
      setIsPaid(false);
      setChecking(false);
      return;
    }

    let cancelled = false;

    async function checkPayment() {
      console.log("🔍 Checking payment from backend...");
      try {
        const res = await fetch(
          `http://localhost:3001/api/payments/check?template=${templateName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("📦 /check response:", data);

        if (!cancelled && data.isPaid) {
          setIsPaid(true);
        }
      } catch (err) {
        console.error("❌ Payment check failed:", err);
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    checkPayment();

    return () => {
      cancelled = true;
    };
  }, [user, token, templateName]);

  const requirePayment = () => {
    console.log("🔐 requirePayment called, isPaid =", isPaid);
    if (!isPaid) {
      setShowPaymentModal(true);
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async () => {
    console.log("🔥 handlePaymentSuccess CALLED");
    console.log("➡️ Token used:", token);

    try {
      const res = await fetch(
        "http://localhost:3001/api/payments/mark-paid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ template: templateName }),
        }
      );

      console.log("📡 mark-paid response status:", res.status);

      const data = await res.json();
      console.log("✅ mark-paid response data:", data);

      if (data.success && data.user) {
        setIsPaid(true);
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
