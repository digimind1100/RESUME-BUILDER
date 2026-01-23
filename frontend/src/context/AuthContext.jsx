import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";
import API from "../api/API";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 INITIAL AUTH CHECK (on app load)
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

      setLoading(false); // ✅ auth resolved
    }

    loadUser();
  }, []);

  // 🔹 LOGIN
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    setLoading(false); // ✅ IMPORTANT
  };

  // 🔹 SIGNUP
  const signup = async (data) => {
    const res = await API.post("/auth/signup", data);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    setLoading(false); // ✅ IMPORTANT
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
