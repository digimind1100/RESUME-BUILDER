import { createContext, useContext, useEffect, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState(true);

  // 🔹 App load → check existing login
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

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

    if (res.ok) {
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      setUser(res.user);
    }

    setLoading(false);
    return res; // 🔥 VERY IMPORTANT
  };

  // 🔹 LOGIN
  const login = async (payload) => {
    setLoading(true);

    const res = await loginApi(payload);

    if (res.ok) {
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      setUser(res.user);
    }

    setLoading(false);
    return res; // 🔥 VERY IMPORTANT
  };

  // 🔹 LOGOUT
  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
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
  }}
>

      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
