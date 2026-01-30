const API_URL = import.meta.env.VITE_API_URL;

export async function fetchHomeReviews() {
  const res = await fetch(
    `${API_URL}/api/reviews?status=approved&limit=6`
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function fetchAllReviews() {
  const res = await fetch(
    `${API_URL}/api/reviews?status=approved`
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
