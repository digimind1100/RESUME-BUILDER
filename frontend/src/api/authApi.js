/* src/api/authApi.js */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

console.log("API URL:", API_BASE_URL);

async function handleJsonResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    return {
      ok: false,
      status: response.status,
      user: null,
      token: null,
      message: "Unexpected server response.",
    };
  }

  return {
    ok: data.success === true,
    status: response.status,
    user: data.user || null,
    token: data.token || null,
    message: data.message || "",
    raw: data,
  };
}

/* ======================
   SIGNUP
====================== */
export async function signup({ fullName, email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 cookie set hoga
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
      }),
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Signup error (frontend):", error);
    return {
      ok: false,
      status: 0,
      user: null,
      token: null,
      message: "Unable to connect to server.",
    };
  }
}

/* ======================
   LOGIN
====================== */
export async function login({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 REQUIRED for httpOnly cookie
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Login error (frontend):", error);
    return {
      ok: false,
      status: 0,
      user: null,
      message: "Unable to connect to server.",
    };
  }
}

/* ======================
   GET CURRENT USER (COOKIE BASED)
====================== */
export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include", // 🔥 cookie bheji jayegi
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Get current user error:", error);
    return {
      ok: false,
      status: 0,
      user: null,
      token: null,
      message: "Unable to connect to server.",
    };
  }
}

/* ======================
   LOGOUT  ✅ (BUILD ERROR FIX)
====================== */
export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // 🔥 cookie clear hogi
    });
    return { ok: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { ok: false };
  }
}
