import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ReviewModal.css";

export default function ReviewModal({
  onClose,
  onSubmit,
}) {
  const { user } = useAuth();

  // ⭐ Default 5-star rating
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto-fill name if user exists
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    await onSubmit({ name, rating, review });
    setLoading(false);

    onClose();
  };

  return (
    <div className="review-overlay">
      <div className="review-modal">
        
        {/* ❌ Close */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="review-title">⭐ Leave a Review</h3>

        <form onSubmit={handleSubmit}>
          {/* 👤 NAME */}
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user ? "Edit your name" : "Your name"}
            required
          />

          {/* ⭐ STAR RATING */}
          <label>Rating</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* ✍️ REVIEW */}
          <label>Review (optional)</label>
          <textarea
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your feedback..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
