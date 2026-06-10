import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./PaymentModal.css";

import easypaisaLogo from "../../assets/payments/easypaisa.png";
import jazzcashLogo from "../../assets/payments/jazzcash.png";
import sadapayLogo from "../../assets/payments/sadapay.png";
import easypaisaQR from "../../assets/payments/easypaisa-qr.jpeg";

import { useAuth } from "../../context/AuthContext";


export default function PaymentModal({ onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");
  const { refreshUser } = useAuth();

  const [method, setMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const [showPendingPopup, setShowPendingPopup] = useState(false);

  if (!modalRoot) return null;

  /* ===============================
     💳 PAYMENT ACCOUNTS
     =============================== */
  const PAYMENT_ACCOUNTS = {
    easypaisa: {
      name: "EasyPaisa",
      number: "0300-2463822",
      logo: easypaisaLogo,
    },
  };

  /* ===============================
     🚀 PAYFAST – INSTANT PAYMENT
     =============================== */
  const startPayFastPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }

      const res = await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/payfast/create-payment",
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
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
      console.error("PayFast error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  /* ===============================
     🐢 MANUAL PAYMENT SUBMIT
     =============================== */
  const handlePayment = async () => {
    if (!method || !transactionId || loading) {
      alert("Please select payment method and enter transaction ID");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/payments/submit",
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            method,
            amount: 299,
            transactionId,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Payment submission failed");
        return;
      }

      // ✅ ONLY THIS FOR MANUAL PAYMENT
      setStatus("pending");
      setShowPendingPopup(true);

      // ❌ DO NOT CALL onSuccess / handlePaymentSuccess here

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
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        setPromoLoading(false);
        return;
      }
      console.log("Redeeming promo:", promoCode);

      const res = await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/promo/redeem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

      await refreshUser();
      alert("🎉 Premium unlocked!");
      if (typeof onSuccess === "function") {
        onSuccess();
      }

    } catch (err) {
      setPromoLoading(false);
      console.error("PROMO ERROR:", err);
      alert(err?.message || "Promo redeem failed");
    }

  };

  const selectedAccount = method ? PAYMENT_ACCOUNTS[method] : null;

  /* ===============================
     🧱 RENDER
     =============================== */
  return createPortal(
    <div className="payment-overlay">
      <div className="payment-modal premium">
        <h2 className="payment-title">🔓 Unlock Resume</h2>
        <p className="payment-subtitle">
          One-time payment to unlock full editing
        </p>

        <div className="payment-price">Rs 299</div>
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
            <p>Send <b>Rs 299</b> to:</p>
            <p>
              <b>Account:</b> {selectedAccount.number}<br />
              <b></b> {selectedAccount.holder}
            </p>
          </div>
        )}


        {method === "easypaisa" && (
  <div className="qr-payment-box">
    <img
      src={easypaisaQR}
      alt="EasyPaisa QR Code"
      className="payment-qr-img"
    />

    <p className="qr-payment-text">
      Scan this QR code and pay <b>Rs 299</b> via EasyPaisa.
    </p>

    <p className="qr-payment-note">
      After payment, enter your Transaction ID below for verification.
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

        {showPendingPopup && (
          <div className="pending-popup-overlay">
            <div className="pending-popup">
              <h3>⏳ Payment Submitted</h3>
              <p>
                Your payment has been received and is pending admin approval.
              </p>
              <p>
                Approval usually takes <b>5–30 minutes</b>.
              </p>

              <button
                className="unlock-btn"
                onClick={() => {
                  setShowPendingPopup(false);
                  onClose(); // close payment modal
                }}
              >
                OK
              </button>
            </div>
          </div>
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
          <button className="close-btn-1" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </div>,
    modalRoot
  );
}
