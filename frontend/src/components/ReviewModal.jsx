import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./ReviewModal.css";

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

    setLoading(true);
    await onSubmit({ name, rating, review });
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
          <label>Review (optional)</label>
          <textarea
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your feedback..."
          />

          {/* 🌟 PRETTY BUTTON */}
          <button
            type="submit"
            className="submit-review-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
