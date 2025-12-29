import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./PaymentModal.css";

export default function PaymentModal({ onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 PROMO STATES
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  if (!modalRoot) return null;

  // ---------------- PAYMENT ----------------
  const handlePayment = async () => {
    if (!method || loading) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onSuccess();
      }, 900);
    }, 1500);
  };

  // ---------------- PROMO REDEEM ----------------
  const redeemPromo = async () => {
    if (!promoCode || promoLoading) return;

    setPromoLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/promo/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid promo code");
        setPromoLoading(false);
        return;
      }

      setPromoLoading(false);
      onSuccess();
    } catch {
      alert("Failed to redeem promo");
      setPromoLoading(false);
    }
  };

  return createPortal(
    <div className="payment-overlay">
      <div className="payment-modal premium">

        {/* HEADER */}
        <h2 className="payment-title">🔓 Unlock Resume</h2>
        <p className="payment-subtitle">
          One-time payment to unlock full editing
        </p>

        <div className="payment-price">Rs 999</div>

        {/* PAYMENT METHODS */}
        {!success && (
          <div className="payment-methods">
            {["easypaisa", "jazzcash", "sadapay"].map((p) => (
              <label
                key={p}
                className={`payment-option ${method === p ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={p}
                  disabled={loading}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
              </label>
            ))}
          </div>
        )}

        {/* ACTION BUTTON */}
        {!success ? (
          <button
            className="unlock-btn"
            disabled={!method || loading}
            onClick={handlePayment}
          >
            {loading ? <span className="spinner" /> : "Unlock Now"}
          </button>
        ) : (
          <div className="payment-success">✅ Payment Successful</div>
        )}

        {/* PROMO TOGGLE BUTTON */}
        {!success && (
          <button
            className="promo-toggle-btn"
            onClick={() => setShowPromo(!showPromo)}
          >
            I have a promo code
          </button>
        )}

        {/* PROMO INPUT */}
        {showPromo && !success && (
          <div className="promo-container">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />

            <button
              className="promo-redeem-btn"
              onClick={redeemPromo}
              disabled={promoLoading}
            >
              {promoLoading ? "Checking..." : "Redeem Code"}
            </button>
          </div>
        )}

        {/* CANCEL */}
        {!loading && !success && (
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </div>,
    modalRoot
  );
}
