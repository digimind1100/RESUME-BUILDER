import React from "react";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {review.profileImage ? (
            <img src={review.profileImage} alt={review.name} />
          ) : (
            <span>{review.name.charAt(0)}</span>
          )}
        </div>

        <div>
          <h4>{review.name}</h4>
          <p className="job-title">{review.jobTitle}</p>
        </div>
      </div>

      <div className="review-rating">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      <p className="review-text">{review.text}</p>
    </div>
  );
}
