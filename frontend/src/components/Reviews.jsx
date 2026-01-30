import React, { useState } from "react";
import ReviewCard from "../components/ReviewCard";
import "./Reviews.css";

export default function Reviews({ reviews }) {
  const [visible, setVisible] = useState(6);

  return (
    <div className="reviews-page">
      <h1>Customer Reviews</h1>
      <p>Real feedback from users who built resumes using resumebuilder.pk</p>

      <div className="reviews-grid">
        {reviews.slice(0, visible).map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {visible < reviews.length && (
        <button
          className="btn-primary load-more"
          onClick={() => setVisible(v => v + 6)}
        >
          Load more
        </button>
      )}
    </div>
  );
}
