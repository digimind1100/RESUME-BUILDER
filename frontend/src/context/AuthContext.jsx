/* src/context/AuthContext.jsx */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/authApi";

const AuthContext = createContext(null);

// 🔐 SINGLE SOURCE OF TRUTH
const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔥 Auth modal state
  const [authModal, setAuthModal] = useState({
    open: false,
    redirectTo: null,
  });

  /* ===============================
     🔁 Restore session on app load
     =============================== */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;
        await refreshUser();
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  /* ===============================
     🔐 Apply auth result (CORE FIX)
     =============================== */
  function applyAuth(result) {
    if (result?.success && result.token && result.user) {
      // 🔥 STORE TOKEN (THIS WAS MISSING)
      localStorage.setItem(TOKEN_KEY, result.token);
      setUser(result.user);
    }
  }

  /* ===============================
     🔹 Signup
     =============================== */
  async function signup({ fullName, email, password }) {
    setLoading(true);
    try {
      const result = await signupApi({ fullName, email, password });
      applyAuth(result);
      return result;
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     🔹 Login
     =============================== */
  async function login({ email, password }) {
    setLoading(true);
    try {
      const result = await loginApi({ email, password });
      applyAuth(result);
      return result;
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     🔹 Logout
     =============================== */
  async function logout() {
    try {
      await logoutApi();
    } catch {}
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  /* ===============================
     🔁 Refresh user (JWT-based)
     =============================== */
  async function refreshUser() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      const result = await getCurrentUser(token);
      if (result?.success && result.user) {
        setUser(result.user);
      }
    } catch (err) {
      console.error("refreshUser failed", err);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  /* ===============================
     🔥 Auth modal helpers
     =============================== */
  function openAuthModal({ redirectTo }) {
    setAuthModal({
      open: true,
      redirectTo: redirectTo || null,
    });
  }

  function closeAuthModal() {
    setAuthModal({
      open: false,
      redirectTo: null,
    });
  }

  function onAuthSuccess() {
    const path = authModal.redirectTo;
    closeAuthModal();
    if (path) navigate(path);
  }

  const value = {
    user,
    setUser,
    loading,
    initializing,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",

    signup,
    login,
    logout,
    refreshUser,

    authModal,
    openAuthModal,
    closeAuthModal,
    onAuthSuccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
