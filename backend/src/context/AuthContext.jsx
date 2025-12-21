import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "rb_auth_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // 🔁 Restore session on reload
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      setInitializing(false);
      return;
    }

    setToken(savedToken);

    authApi
      .getCurrentUser(savedToken)
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      })
      .finally(() => setInitializing(false));
  }, []);

  async function signup(data) {
    setLoading(true);
    const res = await authApi.signup(data);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    setLoading(false);
    return res;
  }

  async function login(data) {
    setLoading(true);
    const res = await authApi.login(data);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    setLoading(false);
    return res;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // 🔥 required for payment later
        token,
        loading,
        initializing,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
