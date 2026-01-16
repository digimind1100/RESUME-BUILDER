// src/components/guards/BuilderGuard.jsx
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import usePaymentGuard from "../../hooks/usePaymentGuard";

export default function BuilderGuard({ children }) {
  const { user } = useAuth();
  const { isPaid, requirePayment } = usePaymentGuard();

useEffect(() => {
  if (!user) return;           // 🔥 WAIT until user exists
  if (!isPaid) {
    requirePayment();
  }
}, [user, isPaid]);


  // ✅ ALWAYS render children (modal controls access)
  return children;
}
