import { useState } from "react";
import "./ReviewModal.css";

export default function ReviewModal({
  userName = "",
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState(userName);
  const [rating, setRating] = useState(5); // ⭐ default 5
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    await onSubmit({ name, rating, review });

    // ✅ mark as submitted ONLY here
    localStorage.setItem("reviewSubmitted", "true");

    setLoading(false);
    onClose();
  };

  return (
    <div className="review-overlay">
      <div className="review-modal">
         onClick={(e) => e.stopPropagation()}
        {/* ✅ CLOSE BUTTON FIXED */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="review-title">⭐ Leave a Review</h3>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />

          {/* ⭐ STAR RATING */}
          <label>Rating</label>
          <div className="stars">
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
