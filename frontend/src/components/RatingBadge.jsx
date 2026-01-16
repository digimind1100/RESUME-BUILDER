import "./RatingBadge.css";

export default function RatingBadge() {
  return (
    <div className="rating-wrapper">
      <div className="rating-block">

        {/* Stars Centered on Border */}
        <div className="stars-container">
          <span className="star full">★</span>
          <span className="star full">★</span>
          <span className="star full">★</span>
          <span className="star full">★</span>

          {/* Partially Filled 5th Star (25% filled) */}
          <span className="star partial">
            <span className="partial-fill"></span>
            ★
          </span>
        </div>

        {/* Subtext Only */}
        <p className="rating-sub-text">Trusted by 10,000+ users worldwide</p>

      </div>
    </div>
  );
}
