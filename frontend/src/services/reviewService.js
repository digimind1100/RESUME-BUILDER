const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

const reviewsEndpoint = API_BASE.endsWith("/api")
  ? `${API_BASE}/reviews`
  : `${API_BASE}/api/reviews`;

function normalizeReviews(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.reviews)) return data.reviews;
  return [];
}

function hasHomeReviewFlag(review) {
  return Object.prototype.hasOwnProperty.call(review || {}, "showOnHome");
}

export async function fetchHomeReviews() {
  const res = await fetch(
    `${reviewsEndpoint}?status=approved&showOnHome=true&limit=6`
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");

  const reviews = normalizeReviews(await res.json());
  const backendSupportsHomeFlag = reviews.some(hasHomeReviewFlag);
  const homeReviews = backendSupportsHomeFlag
    ? reviews.filter((review) => review.showOnHome === true)
    : reviews;

  return homeReviews.slice(0, 6);
}

export async function fetchAllReviews() {
  const res = await fetch(`${reviewsEndpoint}?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return normalizeReviews(await res.json());
}
