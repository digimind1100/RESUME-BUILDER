import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./ReviewsSection.css";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://resumebuilder.pk/api/reviews?limit=6")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Reviews error:", err));
  }, []);

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
