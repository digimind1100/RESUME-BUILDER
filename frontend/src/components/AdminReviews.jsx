import { useEffect, useState } from "react";
import "./AdminReviews.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Fetch pending reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reviews`, {
        method: "GET",
        credentials: "include", // ✅ COOKIE-BASED AUTH
      });

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await res.json();

      // backend returns: { success: true, reviews: [] }
      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 🔹 Approve / Reject review
  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reviews/${id}`, {
        method: "PATCH",
        credentials: "include", // ✅ COOKIE-BASED AUTH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // backend expects this
      });

      const data = await res.json();

      if (data?.success) {
        // instantly remove from UI
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading reviews…</p>;
  }

  return (
    <div className="admin-reviews-page">
      <h1>Pending Reviews</h1>

      {!reviews.length && (
        <p className="empty">No pending reviews 🎉</p>
      )}

      {reviews.map(review => (
        <div className="admin-review-card" key={review._id}>
          <div className="top">
            <strong>{review.name}</strong>
            {review.jobTitle && <span>{review.jobTitle}</span>}
          </div>

          <div className="rating">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <p className="text">{review.text}</p>

          <div className="actions">
            <button
              className="approve"
              onClick={() => handleAction(review._id, "approved")}
            >
              Approve
            </button>

            <button
              className="reject"
              onClick={() => handleAction(review._id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
