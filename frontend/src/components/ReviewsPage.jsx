import React, { useEffect, useState } from "react";

const API_BASE = "https://resume-builder-backend-production-116d.up.railway.app";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to load reviews", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p style={{ textAlign: "center" }}>No reviews yet.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        What Our Users Say
      </h2>

      {reviews.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <strong>{r.name || "Anonymous"}</strong>
          <div style={{ color: "#f5a623", margin: "5px 0" }}>
            {"★".repeat(r.rating)}
          </div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
