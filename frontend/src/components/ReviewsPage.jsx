import React, { useEffect, useState } from "react";
import { fetchAllReviews } from "../services/reviewService";
import ReviewCard from "./ReviewCard";
import "./HomeReviews.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p style={{ textAlign: "center" }}>No reviews yet.</p>;
  }

  return (
    <div style={{ maxWidth: "1150px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "28px" }}>
        What Our Users Say
      </h2>

      <div className="home-reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
