import React, { useState } from "react";
import "./SubmitReviewModal.css";

export default function SubmitReviewModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.length < 20) {
      alert("Please write at least 20 characters.");
      return;
    }
    onSubmit({ rating, text });
  };

  return (
    <div className="review-overlay">
      <div className="review-modal">
        <h3>Leave a Review</h3>

        {/* Rating */}
        <div className="stars">
          {[1,2,3,4,5].map((n) => (
            <span
              key={n}
              className={n <= rating ? "star active" : "star"}
              onClick={() => setRating(n)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Text */}
        <textarea
          placeholder="Write your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
        />

        <div className="review-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
