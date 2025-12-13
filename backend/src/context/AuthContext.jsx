// src/context/AuthContext.jsx
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

  // On app load: check local token & fetch /me
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      setInitializing(false);
      return;
    }

    setToken(savedToken);

    (async () => {
      const result = await getCurrentUser(savedToken);

      if (result.ok && result.user) {
        setUser(result.user);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setToken(null);
      }

      setInitializing(false);
    })();
  }, []);

  function applyAuth(result) {
    if (result.ok && result.token && result.user) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem(TOKEN_KEY, result.token);
    }
  }

  // SIGNUP
  async function signup({ fullName, email, password }) {
    setLoading(true);
    const result = await signupApi({ fullName, email, password });
    applyAuth(result);
    setLoading(false);
    return result;
  }

  // LOGIN
  async function login({ email, password }) {
    setLoading(true);
    const result = await loginApi({ email, password });
    applyAuth(result);
    setLoading(false);
    return result;
  }

  // LOGOUT
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  const value = {
    user,
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
