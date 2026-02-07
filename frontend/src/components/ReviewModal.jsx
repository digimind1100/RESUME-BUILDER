import { useState } from "react";
import { createPortal } from "react-dom";
import "./ReviewModal.css";

export default function ReviewModal({ userName, onClose, onSubmit }) {
  const [name, setName] = useState(userName || "");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    await onSubmit({ name, rating, review });
    setLoading(false);
  };

  return createPortal(
    <div
      className="review-overlay"
      onClick={onClose}   // click outside closes
    >
      <div
        className="review-modal"
        onClick={(e) => e.stopPropagation()} // 🔥 THIS IS THE FIX
      >
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h3>⭐ Leave a Review</h3>

        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          
          <div className="stars">
            {[1,2,3,4,5].map((s) => (
              <span
                key={s}
                className={s <= rating ? "star active" : "star"}
                onClick={() => setRating(s)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            Submit Review
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
