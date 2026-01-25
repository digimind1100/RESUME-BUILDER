// AdminPendingPayments.jsx
import { useEffect, useState } from "react";
import "./AdminPendingPayments.css";

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

    fetchPending();
  };

  const handleReject = async (paymentId) => {
    if (!confirm("Reject this payment?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://resume-builder-backend-production-116d.up.railway.app/api/payments/admin/reject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setPayments((prev) =>
        prev.filter((p) => p._id !== paymentId)
      );
    } else {
      alert(data.message || "Failed to reject payment");
    }
  };

  return (
    <div className="admin-payments-page">
      <h1 className="admin-payments-title">Pending Payments</h1>

      {payments.length === 0 ? (
        <div className="admin-empty">
          No pending payments 🎉
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-payments-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td data-label="User">
                    <span className="admin-user-email">
                      {p.userId.email}
                    </span>
                  </td>

                  <td data-label="Method">
                    <span className="admin-method">
                      {p.method}
                    </span>
                  </td>

                  <td data-label="Amount">
                    Rs {p.amount}
                  </td>

                  <td data-label="Transaction ID">
                    {p.transactionId}
                  </td>

                  <td data-label="Status">
                    <span className={`admin-status ${p.status}`}>
                      {p.status}
                    </span>
                  </td>

                  <td data-label="Action">
                    <div className="admin-actions">
                      <button
                        className="admin-btn approve"
                        onClick={() => approvePayment(p._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="admin-btn reject"
                        onClick={() => handleReject(p._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
