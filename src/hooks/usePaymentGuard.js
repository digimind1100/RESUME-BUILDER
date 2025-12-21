import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function usePaymentGuard(templateName) {
  const { user, setUser } = useAuth();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const isPaid =
    user?.isPaid === true && user?.paidTemplate === templateName;

  const requirePayment = () => {
    if (!isPaid) {
      setShowPaymentModal(true);
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async () => {
    try {
      const token = localStorage.getItem("rb_auth_token");

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

      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user); // 🔥 GLOBAL UPDATE
        setShowPaymentModal(false);
      }
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  };
}
