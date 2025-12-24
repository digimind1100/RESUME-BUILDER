/* src/context/AuthContext.jsx */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "rb_auth_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

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

  // 🔹 Signup → auto login (UNCHANGED BEHAVIOR)
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

  // 🔹 Login for returning users
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

  // 🔹 Logout (explicit & clean)
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
