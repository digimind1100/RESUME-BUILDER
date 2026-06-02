import React from "react";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));

  return (
    <div className="review-card">
      <div className="review-header">
        <strong className="review-name">
          {review.name || review.user?.name || "Anonymous"}
        </strong>

        <div className="review-stars">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
      </div>

      <p className="review-comment">
        {review.comment || review.review || ""}
      </p>
    </div>
  );
}
