// AdminPendingPayments.jsx
import { useEffect, useState } from "react";

export default function AdminPendingPayments() {
  const [payments, setPayments] = useState([]);

  console.log("🔥 ADMIN PAGE MOUNTED");

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://resume-builder-backend-production-116d.up.railway.app/api/payments/admin/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (data.success) {
      setPayments(data.payments);
    }
  };

  const approvePayment = async (paymentId) => {
    const token = localStorage.getItem("token");

    await fetch(
      "https://resume-builder-backend-production-116d.up.railway.app/api/payments/admin/approve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId }),
      }
    );

    fetchPending(); // refresh list
  };

  return (
    <div>
      <h2>Pending Payments</h2>

      {payments.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ddd", padding: 10 }}>
          <p><b>User:</b> {p.userId.email}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Transaction:</b> {p.transactionId}</p>

          <button onClick={() => approvePayment(p._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
