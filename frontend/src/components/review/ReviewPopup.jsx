import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import "./ReviewPopup.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

const reviewEndpoint = API_BASE.endsWith("/api")
  ? `${API_BASE}/reviews`
  : `${API_BASE}/api/reviews`;

export default function ReviewPopup({ templateId, onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");
  const { refreshUser } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("Great resume builder");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!modalRoot) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login again to submit your review.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(reviewEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment,
          templateId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.canAccessPremium) {
        setError(data.message || "Review submission failed. Please try again.");
        return;
      }

      await refreshUser();

      if (typeof onSuccess === "function") {
        await onSuccess(data);
      }

      onClose();
    } catch (err) {
      console.error("Review submit error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="review-gate-overlay">
      <div className="review-gate-modal">
        <h2 className="review-gate-title">Unlock Resume Access</h2>
        <p className="review-gate-subtitle">
          Leave a quick review to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="review-gate-label">Rating</label>
          <div className="review-gate-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= rating ? "active" : ""}
                onClick={() => setRating(star)}
                aria-label={`${star} star rating`}
              >
                ★
              </button>
            ))}
          </div>

          <label className="review-gate-label" htmlFor="review-comment">
            Review
          </label>
          <textarea
            id="review-comment"
            className="review-gate-input"
            rows="4"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell us what you think..."
            required
          />

          {error && <div className="review-gate-error">{error}</div>}

          <button
            type="submit"
            className="review-gate-submit"
            disabled={loading || !comment.trim()}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

          <button
            type="button"
            className="review-gate-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
