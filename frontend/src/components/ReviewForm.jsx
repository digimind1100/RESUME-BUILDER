import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

export default function ReviewForm({ onClose }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (text.length < 20) {
      return setError("Review must be at least 20 characters.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews`,
        { rating, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="review-success">
        <h3>🎉 Thank you!</h3>
        <p>Your review has been submitted for approval.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="review-overlay">
      <div className="review-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h3>Leave a Review</h3>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(+e.target.value)}>
            {[5,4,3,2,1].map((r) => (
              <option key={r} value={r}>{r} ⭐</option>
            ))}
          </select>

          <label>Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={4}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
