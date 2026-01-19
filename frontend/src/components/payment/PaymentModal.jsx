import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./PaymentModal.css";
import easypaisaLogo from "../../assets/payments/easypaisa.png";
import jazzcashLogo from "../../assets/payments/jazzcash.png";
import sadapayLogo from "../../assets/payments/sadapay.png";
import { useAuth } from "../../context/AuthContext";

export default function PaymentModal({ onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");

  const [method, setMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | pending

  // PROMO
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const { refreshUser } = useAuth();

  if (!modalRoot) return null;

  // 🔐 MANUAL PAYMENT ACCOUNTS
  const PAYMENT_ACCOUNTS = {
    easypaisa: {
      name: "EasyPaisa",
      number: "0300-2463822",
      holder: "DigiMind",
      logo: easypaisaLogo,
    },
    jazzcash: {
      name: "JazzCash",
      number: "0300-2463822",
      holder: "DigiMind",
      logo: jazzcashLogo,
    },
    sadapay: {
      name: "SadaPay",
      number: "0300-2463822",
      holder: "DigiMind",
      logo: sadapayLogo,
    },
  };

  /* ===============================
     🚀 PAYFAST – INSTANT PAYMENT
     =============================== */
  const startPayFastPayment = async () => {
    try {
      const res = await fetch("/api/payfast/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        alert("Unable to start PayFast payment");
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      Object.entries(data.paymentData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  /* ===============================
     🐢 MANUAL PAYMENT SUBMIT
     =============================== */
  const handlePayment = async () => {
    console.log("🔥 PaymentModal manual submit clicked");

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

      // 🔥 CRITICAL FIX: trigger paid flow
      console.log("🔥 Manual payment submitted, calling onSuccess");

      if (typeof onSuccess === "function") {
        await onSuccess(); // calls usePaymentGuard.handlePaymentSuccess
      }

      setStatus("pending");
    } catch (err) {
      setLoading(false);
      alert("Network error. Try again.");
    }
  };

  /* ===============================
     🎟 PROMO CODE (INSTANT UNLOCK)
     =============================== */
 const redeemPromo = async () => {
  if (!promoCode || promoLoading) return;

  setPromoLoading(true);

  try {
    const res = await fetch(
      "https://resume-builder-backend-production-116d.up.railway.app/api/promo/redeem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: promoCode }),
      }
    );

    const data = await res.json();
    setPromoLoading(false);

    if (!res.ok) {
      alert(data.message || "Invalid promo code");
      return;
    }

    // ✅ PROMO SUCCESS
    await refreshUser();
    onClose();
  } catch (err) {
    console.error("Redeem promo error:", err);
    setPromoLoading(false);
    alert("Failed to redeem promo");
  }
};



  const selectedAccount = method ? PAYMENT_ACCOUNTS[method] : null;

  return createPortal(
    <div className="payment-overlay">
      <div className="payment-modal premium">

        <h2 className="payment-title">🔓 Unlock Resume</h2>
        <p className="payment-subtitle">
          One-time payment to unlock full editing
        </p>

        <div className="payment-price">Rs 999</div>
        <div className="payment-note">
          Valid for 30 days · Instant access via PayFast
        </div>

        {status === "idle" && (
          <button
            className="unlock-btn"
            style={{ background: "#1a1a1a", marginBottom: 12 }}
            onClick={startPayFastPayment}
          >
            Pay Instantly with PayFast
          </button>
        )}

        {status === "idle" && (
          <div style={{ textAlign: "center", margin: "10px 0", color: "#777" }}>
            — or pay manually —
          </div>
        )}

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

        {status === "idle" && selectedAccount && (
          <div className="payment-instructions">
            <strong>{selectedAccount.name} Payment</strong>
            <p>Send <b>Rs 999</b> to:</p>
            <p>
              <b>Account:</b> {selectedAccount.number}<br />
              <b>Name:</b> {selectedAccount.holder}
            </p>
          </div>
        )}

        {status === "idle" && method && (
          <input
            type="text"
            className="promo-input"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        )}

        {status === "idle" && method && (
          <button
            className="unlock-btn"
            disabled={!transactionId || loading}
            onClick={handlePayment}
          >
            {loading ? "Submitting..." : "Submit Manual Payment"}
          </button>
        )}

        {status === "pending" && (
          <div className="payment-success">
            ⏳ Payment submitted. Verification in progress.
          </div>
        )}

        {status === "idle" && (
          <button
            className="promo-toggle-btn"
            onClick={() => setShowPromo(!showPromo)}
          >
            I have a promo code
          </button>
        )}

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
