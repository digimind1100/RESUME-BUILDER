const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function markUserPaid(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/payment/mark-paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return {
      ok: data.success === true,
      user: data.user || null,
      message: data.message || "",
    };
  } catch (err) {
    return {
      ok: false,
      user: null,
      message: "Payment request failed",
    };
  }
}
