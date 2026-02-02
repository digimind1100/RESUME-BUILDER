import { createContext, useContext, useEffect, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/authApi";

const AuthContext = createContext();
const TOKEN_KEY = "rb_auth_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔹 App load → restore session
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await getCurrentUser(token);
      if (res.success) {
        setUser(res.user);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  // 🔹 SIGNUP
  const signup = async (payload) => {
    setLoading(true);

    const res = await signupApi(payload);

    if (res.ok && res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser(res.user);
    }

    setLoading(false);
    return res;
  };

  // 🔹 LOGIN
  const login = async (payload) => {
    setLoading(true);

    const res = await loginApi(payload);

    if (res.ok && res.token) {
      // 🔥 THIS LINE FIXES EVERYTHING
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser(res.user);
    }

    setLoading(false);
    return res;
  };

  // 🔹 REFRESH USER (used by payments)
  const refreshUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const res = await getCurrentUser(token);
    if (res.success) {
      setUser(res.user);
    }
  };

  // 🔹 LOGOUT
  const logout = async () => {
    await logoutApi();
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        signup,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
