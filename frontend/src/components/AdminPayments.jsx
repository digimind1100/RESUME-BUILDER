import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshUser } = useAuth();
  const token = localStorage.getItem("rb_auth_token");

  const fetchPayments = async () => {
    setLoading(true);

    const res = await fetch("/api/payments/admin/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setPayments(data.payments || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const approvePayment = async (paymentId) => {
    await fetch("/api/payments/admin/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    });

    await refreshUser();   // 🔥 INSTANT UNLOCK MAGIC
    fetchPayments();
  };

  const rejectPayment = async (paymentId) => {
    await fetch("/api/payments/admin/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    });

    fetchPayments();
  };

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin — Pending Payments</h2>

      {payments.length === 0 && <p>No pending payments</p>}

      {payments.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 12,
            borderRadius: 8,
          }}
        >
          <p><b>User:</b> {p.userId?.email}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Amount:</b> Rs {p.amount}</p>
          <p><b>Txn:</b> {p.transactionId}</p>

          <button onClick={() => approvePayment(p._id)}>
            ✅ Approve
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => rejectPayment(p._id)}
          >
            ❌ Reject
          </button>
        </div>
      ))}
    </div>
  );
}
