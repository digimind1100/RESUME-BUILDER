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

export async function fetchHomeReviews() {
  const res = await fetch(`${reviewsEndpoint}?status=approved&limit=6`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return normalizeReviews(await res.json());
}

export async function fetchAllReviews() {
  const res = await fetch(`${reviewsEndpoint}?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return normalizeReviews(await res.json());
}
