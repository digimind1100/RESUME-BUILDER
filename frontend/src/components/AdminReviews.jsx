import { useEffect, useState } from "react";
import "./AdminReviews.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // same auth token

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        "https://resumebuilder.pk/api/admin/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setReviews(data || []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await fetch(
        `https://resumebuilder.pk/api/admin/reviews/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove from list instantly
      setReviews(prev => prev.filter(r => r._id !== id));
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
            <span>{review.jobTitle}</span>
          </div>

          <div className="rating">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <p className="text">{review.text}</p>

          <div className="actions">
            <button
              className="approve"
              onClick={() => handleAction(review._id, "approve")}
            >
              Approve
            </button>

            <button
              className="reject"
              onClick={() => handleAction(review._id, "reject")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
