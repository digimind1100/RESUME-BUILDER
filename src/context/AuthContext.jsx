/* src/context/AuthContext.jsx */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "rb_auth_token";

export function AuthProvider({ children }) {
  const navigate = useNavigate(); // 🔥 NEW

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: auth modal state
  const [authModal, setAuthModal] = useState({
    open: false,
    redirectTo: null,
  });

  // 🔹 Restore session on app load
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      setInitializing(false);
      return;
    }

    setToken(savedToken);

    (async () => {
      try {
        const result = await getCurrentUser(savedToken);

        if (result?.ok && result.user) {
          setUser(result.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
        }
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  // 🔹 Centralized auth application
  function applyAuth(result) {
    if (result?.ok && result.token && result.user) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem(TOKEN_KEY, result.token);
    }
  }

  // 🔹 Signup → auto login
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

  // 🔹 Login
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

  // 🔹 Logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  // 🔥 NEW: open auth modal (used by Start Building)
  function openAuthModal({ redirectTo }) {
    setAuthModal({
      open: true,
      redirectTo: redirectTo || null,
    });
  }

  // 🔥 NEW: close auth modal
  function closeAuthModal() {
    setAuthModal({
      open: false,
      redirectTo: null,
    });
  }

  // 🔥 NEW: call this AFTER login/signup success
  function onAuthSuccess() {
    const path = authModal.redirectTo;
    closeAuthModal();

    if (path) {
      navigate(path);
    }
  }

  // 🔥 Refresh user from backend
  async function refreshUser() {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) return;

    try {
      const result = await getCurrentUser(savedToken);

      if (result?.ok && result.user) {
        setUser(result.user);
      }
    } catch (err) {
      console.error("refreshUser failed", err);
    }
  }

  const value = {
    user,
    setUser,
    token,
    loading,
    initializing,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",

    signup,
    login,
    logout,
    refreshUser,

    // 🔥 EXPOSED FOR START BUILDING FLOW
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
