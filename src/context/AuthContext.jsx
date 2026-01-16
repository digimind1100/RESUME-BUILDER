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

  // 🔹 Restore session via cookie on app load
  useEffect(() => {
    (async () => {
      try {
        const result = await getCurrentUser(); // 🔥 cookie-based
        if (result?.ok && result.user) {
          setUser(result.user);
        }
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  // 🔹 Apply auth result
  function applyAuth(result) {
    if (result?.ok && result.user) {
      setUser(result.user);
    }
  }

  // 🔹 Signup
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
  async function logout() {
    try {
      await logoutApi(); // clears cookie on backend
    } catch {}
    setUser(null);
  }

  // 🔥 Open auth modal
  function openAuthModal({ redirectTo }) {
    setAuthModal({
      open: true,
      redirectTo: redirectTo || null,
    });
  }

  // 🔥 Close auth modal
  function closeAuthModal() {
    setAuthModal({
      open: false,
      redirectTo: null,
    });
  }

  // 🔥 Call after successful auth
  function onAuthSuccess() {
    const path = authModal.redirectTo;
    closeAuthModal();
    if (path) navigate(path);
  }

  // 🔥 Refresh user from backend
  async function refreshUser() {
    try {
      const result = await getCurrentUser();
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
