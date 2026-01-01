import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./PaymentModal.css";
import easypaisaLogo from "../../assets/payments/easypaisa.png";
import jazzcashLogo from "../../assets/payments/jazzcash.png";
import sadapayLogo from "../../assets/payments/sadapay.png";



export default function PaymentModal({ onClose }) {
  const modalRoot = document.getElementById("modal-root");

  const [method, setMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | pending

  // PROMO
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  if (!modalRoot) return null;

  // 🔐 YOUR PAYMENT ACCOUNTS (SAFE, READ-ONLY)
 const PAYMENT_ACCOUNTS = {
  easypaisa: {
    name: "EasyPaisa",
    number: "0300-2463822",
    holder: "DigiMind",
    logo: easypaisaLogo,
  },
  jazzcash: {
    name: "JazzCash",
    number: "03XX-XXXXXXX",
    holder: "DigiMind",
    logo: jazzcashLogo,
  },
  sadapay: {
    name: "SadaPay",
    number: "03XX-XXXXXXX",
    holder: "DigiMind",
    logo: sadapayLogo,
  },
};


  // ---------------- REAL PAYMENT SUBMIT ----------------
  const handlePayment = async () => {
    if (!method || !transactionId || loading) {
      alert("Please select payment method and enter transaction ID");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("rb_auth_token");

      const res = await fetch("/api/payments/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          method,
          amount: 999,
          transactionId,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Payment submission failed");
        return;
      }

      // ⏳ WAIT FOR ADMIN APPROVAL
      setStatus("pending");
    } catch (err) {
      setLoading(false);
      alert("Network error. Try again.");
    }
  };

  // ---------------- PROMO REDEEM ----------------
  const redeemPromo = async () => {
    if (!promoCode || promoLoading) return;

    setPromoLoading(true);

    try {
      const token = localStorage.getItem("rb_auth_token");

      const res = await fetch("/api/promo/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await res.json();
      setPromoLoading(false);

      if (!res.ok) {
        alert(data.message || "Invalid promo code");
        return;
      }

      setStatus("pending");
    } catch {
      setPromoLoading(false);
      alert("Failed to redeem promo");
    }
  };

  const selectedAccount = method ? PAYMENT_ACCOUNTS[method] : null;

  return createPortal(
    <div className="payment-overlay">
      <div className="payment-modal premium">

        {/* HEADER */}
        <h2 className="payment-title">🔓 Unlock Resume</h2>
        <p className="payment-subtitle">
          One-time payment to unlock full editing
        </p>

        <div className="payment-price">Rs 999</div>
        <div className="payment-note">
          One-time payment · Valid for 30 days
        </div>

        {/* PAYMENT METHODS */}
        {status === "idle" && (
          <div className="payment-methods">
            {Object.keys(PAYMENT_ACCOUNTS).map((p) => (
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
                <img
                  src={PAYMENT_ACCOUNTS[p].logo}
                  alt={p}
                  style={{ width: 28, height: 28, marginRight: 8 }}
                />
                <span>{PAYMENT_ACCOUNTS[p].name}</span>
              </label>
            ))}
          </div>
        )}

        {/* PAYMENT INSTRUCTIONS */}
        {status === "idle" && selectedAccount && (
          <div className="payment-instructions">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={selectedAccount.logo}
                alt={selectedAccount.name}
                style={{ width: 36, height: 36 }}
              />
              <strong>{selectedAccount.name} Payment</strong>
            </div>

            <p style={{ marginTop: 8 }}>
              Send <b>Rs 999</b> to:
            </p>

            <p>
              <b>Account Number:</b> {selectedAccount.number}<br />
              <b>Account Name:</b> {selectedAccount.holder}
            </p>

            <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
              After payment, copy the Transaction ID and enter it below.
            </p>
          </div>
        )}

        {/* TRANSACTION ID */}
        {status === "idle" && method && (
          <input
            type="text"
            className="promo-input"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        )}

        {/* ACTION BUTTON */}
        {status === "idle" ? (
          <button
            className="unlock-btn"
            disabled={!method || !transactionId || loading}
            onClick={handlePayment}
          >
            {loading ? <span className="spinner" /> : "Submit Payment"}
          </button>
        ) : (
          <div className="payment-success">
            ⏳ Payment submitted. Verification in progress (2–12 hours).
          </div>
        )}

        {/* PROMO TOGGLE */}
        {status === "idle" && (
          <button
            className="promo-toggle-btn"
            onClick={() => setShowPromo(!showPromo)}
          >
            I have a promo code
          </button>
        )}

        {/* PROMO INPUT */}
        {showPromo && status === "idle" && (
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
        {!loading && status === "idle" && (
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </div>,
    modalRoot
  );
}
