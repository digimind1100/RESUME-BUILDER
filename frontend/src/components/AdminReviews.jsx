import { useEffect, useState } from "react";
import "./AdminReviews.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("rb_auth_token");

  const fetchReviews = async () => {
  setLoading(true);

  try {
    const res = await fetch("/admin/reviews", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rb_auth_token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to load reviews");
    }

    const data = await res.json();
    setReviews(Array.isArray(data.reviews) ? data.reviews : []);
  } catch (err) {
    console.error("Fetch reviews error:", err);
    setReviews([]);
  } finally {
    // 🔥 THIS guarantees UI never gets stuck
    setLoading(false);
  }
};


  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAction = async (id, status) => {
    await fetch(`/admin/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchReviews();
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

      {reviews.map((review) => (
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
