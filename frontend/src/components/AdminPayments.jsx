import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshUser } = useAuth();
  const token = localStorage.getItem("rb_auth_token");

  // 🔥 BACKEND BASE URL
  const fetchPayments = async () => {
    setLoading(true);

    const res = await fetch(
      `${API_BASE}/payments/admin/pending`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Failed to load pending payments");
      setLoading(false);
      return;
    }

    setPayments(data.payments || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const approvePayment = async (paymentId) => {
    const res = await fetch(`${API_BASE}/payments/admin/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Failed to approve payment");
      return;
    }

    await refreshUser();
    fetchPayments();
  };

  const rejectPayment = async (paymentId) => {
    const res = await fetch(`${API_BASE}/payments/admin/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Failed to reject payment");
      return;
    }

    fetchPayments();
  };

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin — Pending Payments</h2>

      {payments.length === 0 && <p>No pending payments</p>}

      {payments.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ddd", padding: 15, marginTop: 12 }}>
          <p><b>User:</b> {p.userId?.email}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Amount:</b> Rs {p.amount}</p>

          <button onClick={() => approvePayment(p._id)}>✅ Approve</button>
          <button onClick={() => rejectPayment(p._id)} style={{ marginLeft: 10 }}>
            ❌ Reject
          </button>
        </div>
      ))}
    </div>
  );
}
