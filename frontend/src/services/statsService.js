const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

const statsEndpoint = API_BASE.endsWith("/api")
  ? `${API_BASE}/stats`
  : `${API_BASE}/api/stats`;

export async function fetchSiteStats() {
  const res = await fetch(statsEndpoint);
  if (!res.ok) throw new Error("Failed to fetch site stats");

  const data = await res.json();
  return data.stats || {};
}

export async function trackResumeDownload(type) {
  try {
    const res = await fetch(`${statsEndpoint}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    if (!res.ok) throw new Error("Failed to track resume download");
    return await res.json();
  } catch (err) {
    console.error("Download stats error:", err);
    return null;
  }
}
