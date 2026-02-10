import { useEffect, useState } from "react";
import "./adminTable.css";


const API_BASE = "https://resume-builder-backend-production-116d.up.railway.app";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/reviews?status=pending`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE}/api/admin/reviews/${id}/${status === "approved" ? "approve" : "reject"}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      // ✅ remove approved review from pending list
      setReviews(prev => prev.filter(r => r._id !== id));

    } catch (err) {
      console.error("❌ Approve failed:", err.message);
      alert("Action failed");
    }
  };



  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "15px" }}>Pending Reviews</h2>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>USER</th>
              <th>RATING</th>
              <th>COMMENT</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading && reviews.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No pending reviews
                </td>
              </tr>
            )}

            {reviews.map(review => (
              <tr key={review._id}>
                <td>{review.name || "Anonymous"}</td>
                <td>{review.rating} ⭐</td>
                <td style={{ maxWidth: "300px" }}>{review.comment}</td>
                <td>
                  <span className="badge pending">Pending</span>
                </td>
                <td>
                  <button
                    className="btn approve"
                    onClick={() => updateStatus(review._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn reject"
                    onClick={() => updateStatus(review._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
