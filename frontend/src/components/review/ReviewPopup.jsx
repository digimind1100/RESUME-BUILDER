import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { grantReviewAccess } from "../../utils/reviewAccess";
import { MIN_REVIEW_LENGTH, validateReviewText } from "../../utils/reviewValidation";
import "./ReviewPopup.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

const reviewEndpoint = API_BASE.endsWith("/api")
  ? `${API_BASE}/reviews`
  : `${API_BASE}/api/reviews`;

export default function ReviewPopup({ templateId, onClose, onSuccess }) {
  const modalRoot = document.getElementById("modal-root");
  const { isEmailVerified, refreshUser, setUser, user } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const trimmedComment = comment.trim();
  const remainingChars = Math.max(0, MIN_REVIEW_LENGTH - trimmedComment.length);
  const reviewValidation = validateReviewText(trimmedComment);
  const hasMinimumLength = trimmedComment.length >= MIN_REVIEW_LENGTH;

  if (!modalRoot) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login again to submit your review.");
      return;
    }

    if (!isEmailVerified) {
      setError("Please verify your email before submitting a review.");
      return;
    }

    if (!reviewValidation.isValid) {
      setError(reviewValidation.message);
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
          comment: trimmedComment,
          templateId,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "Review submission failed. Please try again.");
        return;
      }

      grantReviewAccess(user);

      await refreshUser();

      setUser((prev) =>
        prev
          ? {
              ...prev,
              canAccessPremium: true,
            }
          : prev
      );

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
          Share one genuine sentence about your experience to continue.
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
            placeholder="What helped you most: templates, AI writing, PDF download, or ease of use?"
            required
          />
          <div className={reviewValidation.isValid ? "review-gate-help valid" : "review-gate-help"}>
            {hasMinimumLength
              ? reviewValidation.message
              : `${remainingChars} more characters needed for a meaningful review.`}
          </div>

          {error && <div className="review-gate-error">{error}</div>}

          <button
            type="submit"
            className="review-gate-submit"
            disabled={loading || !hasMinimumLength}
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
