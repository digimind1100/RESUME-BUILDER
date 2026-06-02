import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllReviews } from "../services/reviewService";
import ReviewCard from "./ReviewCard";
import "./HomeReviews.css";

export default function HomeReviews() {
  const [reviews, setReviews] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllReviews()
      .then((data) => {
        setAllCount(data.length);
        setReviews(data.slice(0, 6));
      })
      .catch((err) => console.error("Review fetch error:", err));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="home-reviews">
      <h2 className="home-reviews-title">What our users say</h2>

      <div className="home-reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {allCount > 6 && (
        <div className="reviews-view-more">
          <button
            className="view-more-btn"
            onClick={() => navigate("/reviews")}
          >
            View All {allCount} Reviews
          </button>
        </div>
      )}
    </section>
  );
}
