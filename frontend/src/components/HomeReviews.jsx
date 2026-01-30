import React from "react";
import ReviewCard from "./ReviewCard";
import "./HomeReviews.css";

export default function HomeReviews({ reviews }) {
  return (
    <section className="home-reviews">
      <h2>What Our Users Say</h2>

      <div className="reviews-grid">
        {reviews.slice(0, 6).map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <div className="reviews-cta">
        <a href="/reviews" className="btn-outline">
          View all reviews
        </a>
      </div>
    </section>
  );
}
