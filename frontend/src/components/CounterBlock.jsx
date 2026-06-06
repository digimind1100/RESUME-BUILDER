import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { TEMPLATES_AVAILABLE_COUNT } from "../config/templateCatalog";
import { fetchSiteStats } from "../services/statsService";
import "./CounterBlock.css";

const defaultStats = {
  resumesCreated: 0,
  aiDownloads: 0,
  nonAiDownloads: 0,
  aiSuggestionsGenerated: 0,
  averageRating: 0,
  reviewCount: 0,
};

function RatingStars({ rating }) {
  return (
    <div className="stars-container-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, rating - (star - 1)));
        const fillPercent = Math.round(fill * 100);
        const className =
          fillPercent === 100
            ? "star full"
            : fillPercent === 0
              ? "star empty"
              : "star partial";

        return (
          <span
            key={star}
            className={className}
            style={
              fillPercent > 0 && fillPercent < 100
                ? {
                    background: `linear-gradient(to right, #ffb400 ${fillPercent}%, #e6e6e6 ${fillPercent}%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : undefined
            }
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

const CounterBlock = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    let isMounted = true;

    fetchSiteStats()
      .then((data) => {
        if (!isMounted) return;
        setStats({ ...defaultStats, ...data });
      })
      .catch((err) => console.error("Stats fetch error:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const counters = [
    { value: stats.resumesCreated, label: "Resumes Created" },
    { value: TEMPLATES_AVAILABLE_COUNT, label: "Templates Available" },
    { value: stats.aiSuggestionsGenerated, label: "AI Suggestions Generated" },
    { value: stats.nonAiDownloads, label: "Non AI Generated" },
  ];

  const ratingText =
    stats.reviewCount > 0
      ? `${stats.averageRating.toFixed(1)} average from ${stats.reviewCount} approved reviews`
      : "No approved reviews yet";

  return (
    <section id="counter-block" className="counter-block-section">
      <div className="counter-container">
        <h2 className="counter-title">Our Impact So Far</h2>
        <p className="counter-subtitle">
          Real usage numbers from ResumeBuilder.pk activity
        </p>

        <div className="counter-grid">
          {counters.map((counter) => (
            <div className="counter-card" key={counter.label}>
              <CountUp
                end={counter.value}
                duration={2.5}
                separator=","
                className="counter-number"
              />
              <p className="counter-label">{counter.label}</p>
            </div>
          ))}
        </div>

        <div className="rating-wrapper">
          <div className="rating-block">
            <RatingStars rating={stats.averageRating} />
            <p className="rating-sub-text">{ratingText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterBlock;
