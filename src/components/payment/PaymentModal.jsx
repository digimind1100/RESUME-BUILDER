import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./PaymentModal.css";

export default function PaymentModal({ onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!modalRoot) return null;

  const handlePayment = async () => {
    if (!method || loading) return;

    setLoading(true);

    // ⏳ FAKE PAYMENT PROCESS (UI ONLY)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // ⏱️ Small delay so user can SEE success state
      setTimeout(() => {
        onSuccess(); // 🔥 THIS triggers mark-paid in parent
      }, 900);
    }, 1500);
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
                className={`payment-option ${
                  method === p ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={p}
                  disabled={loading}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
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
          <div className="payment-success">
            ✅ Payment Successful
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
