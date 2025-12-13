// src/api/authApi.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Common JSON response handler
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

// ---------- SIGNUP ----------
export async function signup({ fullName, email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
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

// ---------- LOGIN ----------
export async function login({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await handleJsonResponse(res);
  } catch (error) {
    console.error("Login error (frontend):", error);
    return {
      ok: false,
      status: 0,
      user: null,
      token: null,
      message: "Unable to connect to server.",
    };
  }
}


// ---------- GET CURRENT USER ----------
export async function getCurrentUser(token) {
  if (!token) {
    return {
      ok: false,
      status: 0,
      user: null,
      token: null,
      message: "Token missing.",
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
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

