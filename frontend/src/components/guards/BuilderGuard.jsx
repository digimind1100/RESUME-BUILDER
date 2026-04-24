// src/components/guards/BuilderGuard.jsx
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import usePaymentGuard from "../../hooks/usePaymentGuard";
import { DEV_MODE } from "../../config/devMode";

export default function BuilderGuard({ children }) {
  const { user } = useAuth();
  const { isPaid, requirePayment } = usePaymentGuard();

  
  const isDev = import.meta.env.DEV;

useEffect(() => {
  if (DEV_MODE.payment.bypassPayment) return;

  if (!user) return;

  if (!isPaid) {
    requirePayment();
  }
}, [user, isPaid]);


  // ✅ ALWAYS render children (modal controls access)
  return children;
}
