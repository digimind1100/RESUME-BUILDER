import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function signup(data) {
  try {
    const res = await API.post("/auth/signup", data);
    return {
      ok: true,
      user: res.data.user,
      token: res.data.token,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        "Unexpected server response.",
    };
  }
}

export async function login(data) {
  try {
    const res = await API.post("/auth/login", data);
    return {
      ok: true,
      user: res.data.user,
      token: res.data.token,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        "Unexpected server response.",
    };
  }
}

export async function getCurrentUser(token) {
  try {
    const res = await API.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      ok: true,
      user: res.data.user,
    };
  } catch {
    return { ok: false };
  }
}
