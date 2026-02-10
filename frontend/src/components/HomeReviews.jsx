import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./HomeReviews.css"; // optional but recommended

const API_BASE = "https://resume-builder-backend-production-116d.up.railway.app";

export default function HomeReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        // 🔥 show only first 6 approved reviews
        setReviews(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="home-reviews">
      <h2 className="home-reviews-title">
        What our users say
      </h2>

      <div className="home-reviews-grid">
        {reviews.map(review => (
          <ReviewCard
            key={review._id}
            review={review}
          />
        ))}
      </div>
    </section>
  );
}
