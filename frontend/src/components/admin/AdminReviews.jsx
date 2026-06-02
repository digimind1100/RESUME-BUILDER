import { useEffect, useState } from "react";
import "./adminTable.css";

const API_BASE = "https://resume-builder-backend-66wy.onrender.com/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/admin/review?status=pending`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pending reviews");
      }

      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setError("Failed to load pending reviews.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const res = await fetch(
        `${API_BASE}/admin/review/${id}/${status === "approved" ? "approve" : "reject"}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Review status update failed:", err.message);
      alert("Action failed");
    } finally {
      setUpdatingId(null);
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
                  {error || "No pending reviews"}
                </td>
              </tr>
            )}

            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.name || review.user?.name || "Anonymous"}</td>
                <td>{review.rating} star</td>
                <td style={{ maxWidth: "300px" }}>
                  {review.comment || review.review || "-"}
                </td>
                <td>
                  <span className="badge pending">
                    {review.status || "pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn approve"
                    disabled={updatingId === review._id}
                    onClick={() => updateStatus(review._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn reject"
                    disabled={updatingId === review._id}
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
