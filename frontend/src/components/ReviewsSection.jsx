import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./ReviewsSection.css";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/reviews?limit=6`, {
      method: "GET",
      credentials: "include", // ✅ SAFE (even if not required)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return res.json();
      })
      .then(data => {
        // backend returns: { success: true, reviews: [...] }
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      })
      .catch(err => {
        console.error("Reviews error:", err);
        setReviews([]);
      });
  }, [API_URL]);

  if (!reviews.length) return null;

  return (
    <section className="reviews-section">
      <h2>What Our Users Say</h2>

      <div className="reviews-grid">
        {reviews.map(review => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </section>
  );
}
