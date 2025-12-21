const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function markPaid(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/payments/mark-paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("markPaid error:", err);
    return { success: false };
  }
}
