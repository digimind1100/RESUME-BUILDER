import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import "./HomeReviews.css";

const API_BASE = "https://resume-builder-backend-production-116d.up.railway.app";

export default function HomeReviews() {
  const [reviews, setReviews] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllCount(data.length);
          setReviews(data.slice(0, 6)); // show only 6
        }
      })
      .catch(err => console.error("Review fetch error:", err));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="home-reviews">
      <h2 className="home-reviews-title">
        What our users say
      </h2>

      <div className="home-reviews-grid">
        {reviews.map(review => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {/* ✅ SHOW BUTTON ONLY IF MORE THAN 6 */}
      {allCount > 6 && (
        <div className="reviews-view-more">
          <button
            className="view-more-btn"
            onClick={() => navigate("/reviews")}
          >
            View All {allCount} Reviews →
          </button>
        </div>
      )}
    </section>
  );
}
