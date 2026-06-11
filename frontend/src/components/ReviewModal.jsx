import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./ReviewModal.css";

const MIN_REVIEW_LENGTH = 50;

export default function ReviewModal({
  onClose,
  onSubmit,
  userName = "", // ✅ fallback support
}) {
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const trimmedReview = review.trim();
  const remainingChars = Math.max(0, MIN_REVIEW_LENGTH - trimmedReview.length);
  const isReviewValid = trimmedReview.length >= MIN_REVIEW_LENGTH;

  // ✅ NAME AUTO-FILL (GUARANTEED)
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    } else if (userName) {
      setName(userName);
    }
  }, [user, userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!isReviewValid) {
      setError(`Please write at least ${MIN_REVIEW_LENGTH} characters about your experience.`);
      return;
    }

    setLoading(true);
    setError("");
    await onSubmit({ name, rating, review: trimmedReview });
    setLoading(false);
    onClose();
  };

  return (
    <div className="review-overlay">
      <div className="review-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h3 className="review-title">⭐ Leave a Review</h3>

        <form onSubmit={handleSubmit}>
          {/* 👤 NAME */}
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

          {/* ⭐ RATING */}
          <label>Rating</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* ✍️ REVIEW */}
          <label>Review</label>
          <textarea
            rows="4"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
              setError("");
            }}
            placeholder="What helped you most: templates, AI writing, PDF download, or ease of use?"
            required
          />
          <div className={isReviewValid ? "review-helper valid" : "review-helper"}>
            {isReviewValid
              ? "Thank you. This looks helpful."
              : `${remainingChars} more characters needed for a meaningful review.`}
          </div>

          {error && <div className="review-error">{error}</div>}

          {/* 🌟 PRETTY BUTTON */}
          <button
            type="submit"
            className="submit-review-btn"
            disabled={loading || !isReviewValid}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
