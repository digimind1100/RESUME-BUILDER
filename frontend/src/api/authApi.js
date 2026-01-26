/* src/api/authApi.js */

/* ======================
   API BASE URL
====================== */

// ✅ Use ONE env variable (already set in Vercel)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Debug (remove later if you want)
console.log("API BASE URL:", API_BASE_URL);

if (!API_BASE_URL) {
  throw new Error("❌ VITE_API_URL is not defined");
}

/* ======================
   HELPER
====================== */
async function parseResponse(res) {
  let data = {};

  try {
    data = await res.json();
  } catch {
    // response not JSON
  }

  if (!res.ok) {
    return {
      ok: false,
      message: data.message || "Request failed",
    };
  }

  return {
    ok: true,
    ...data,
  };
}

/* ======================
   SIGNUP
====================== */
export async function signup({ fullName, email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
    }),
  });

  return await parseResponse(res);
}

/* ======================
   LOGIN
====================== */
export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim(),
    }),
  });

  return await parseResponse(res);
}

/* ======================
   GET CURRENT USER
====================== */
export async function getCurrentUser(token) {
  if (!token) {
    return { ok: false };
  }

  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await parseResponse(res);
}

/* ======================
   LOGOUT
====================== */
export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
