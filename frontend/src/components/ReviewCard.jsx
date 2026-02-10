import React from "react";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <strong className="review-name">
          {review.name || "Anonymous"}
        </strong>

        <div className="review-stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>
      </div>

      <p className="review-comment">
        {review.comment}
      </p>
    </div>
  );
}
