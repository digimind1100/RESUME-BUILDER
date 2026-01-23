/* src/api/authApi.js */

// ❗ PRODUCTION-SAFE: no localhost fallback
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔎 Debug (must appear in browser console)
console.log("API URL:", API_BASE_URL);

if (!API_BASE_URL) {
  console.error("❌ VITE_API_URL is NOT defined");
}

/* ======================
   Helper: JSON handler
====================== */
async function handleJsonResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch (err) {
    return {
      ok: false,
      status: response.status,
      user: null,
      token: null,
      message: "Invalid server response",
    };
  }

  return {
    ok: data?.success === true,
    status: response.status,
    user: data?.user || null,
    token: data?.token || null,
    message: data?.message || "",
    raw: data,
  };
}

/* ======================
   SIGNUP
====================== */
export async function signup({ fullName, email, password }) {
  if (!API_BASE_URL) {
    throw new Error("API base URL missing");
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
      }),
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Signup error (frontend):", error);
    throw error; // 🔥 IMPORTANT (no silent fail)
  }
}

/* ======================
   LOGIN
====================== */
export async function login({ email, password }) {
  if (!API_BASE_URL) {
    throw new Error("API base URL missing");
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Login error (frontend):", error);
    throw error; // 🔥 IMPORTANT
  }
}

/* ======================
   GET CURRENT USER
====================== */
export async function getCurrentUser(token) {
  if (!API_BASE_URL || !token) {
    return { success: false, user: null };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, user: null };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return { success: false, user: null };
  }
}

/* ======================
   LOGOUT
====================== */
export async function logout() {
  if (!API_BASE_URL) {
    return { ok: false };
  }

  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return { ok: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { ok: false };
  }
}
