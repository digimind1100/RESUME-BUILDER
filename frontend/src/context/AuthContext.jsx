import { createContext, useContext, useEffect, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/authApi";

const AuthContext = createContext();
const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 Global loading ONLY for app initialization
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // ===============================
  // 🔹 RESTORE SESSION ON APP LOAD
  // ===============================
  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getCurrentUser(token);

        if (res?.success) {
          setUser(res.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  

  // ===============================
  // 🔹 SIGNUP
  // ===============================
  const signup = async (payload) => {
  try {
    const res = await signupApi(payload);

    console.log("SIGNUP RESPONSE:", res); // 👈 ADD THIS

    if (res?.ok && res?.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser(res.user);
      return { ok: true, user: res.user };
    }

    return {
      ok: false,
      message: res?.message || "Signup failed",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      ok: false,
      message: "Server error. Please try again.",
    };
  }
};


  // ===============================
  // 🔹 LOGIN
  // ===============================
  const login = async (payload) => {
    try {
      const res = await loginApi(payload);

      if (res?.ok && res?.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        setUser(res.user);
        return { ok: true, user: res.user };
      }

      return {
        ok: false,
        message: res?.message || "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        ok: false,
        message: "Server error. Please try again.",
      };
    }
  };

  // ===============================
  // 🔹 REFRESH USER (for payments etc.)
  // ===============================
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      const res = await getCurrentUser(token);
      if (res?.success) {
        setUser(res.user);
      }
    } catch (error) {
      console.error("Refresh user error:", error);
    }
  };

  // ===============================
  // 🔹 LOGOUT
  // ===============================
  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading, // only used for app initialization
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
