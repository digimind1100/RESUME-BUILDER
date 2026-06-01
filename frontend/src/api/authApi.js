import axios from "axios";

/* ===============================
   🔐 API BASE URL
================================ */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";



/* ===============================
   🔗 AXIOS INSTANCE
================================ */

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

/* ===============================
   📝 SIGNUP
================================ */

export async function signup(data) {
  try {
    const res = await API.post("/auth/signup", data);

    return {
      ok: res.data.success,
      token: res.data.token,
      user: res.data.user,
      message: res.data.message,
    };
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Signup failed";

    alert("SIGNUP API ERROR: " + message);

    return {
      ok: false,
      message,
    };
  }
}

/* ===============================
   🔐 LOGIN
================================ */

export async function login(data) {
  try {
    const res = await API.post("/auth/login", data);

    return {
      ok: res.data.success,
      token: res.data.token,
      user: res.data.user,
    };
  } catch (err) {
    console.error("Login Error:", err);

    return {
      ok: false,
      message:
        err.response?.data?.message ||
        "Login failed",
    };
  }
}

/* ===============================
   👤 GET CURRENT USER
================================ */

export async function getCurrentUser(token) {
  try {
    const res = await API.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      user: res.data.user,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}
/* ===============================
   🚪 LOGOUT
================================ */

export async function logout() {
  return {
    ok: true,
  };
}


export default API;