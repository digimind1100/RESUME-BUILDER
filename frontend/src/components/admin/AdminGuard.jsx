import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  // 🔑 VERY IMPORTANT: wait until auth is resolved
  if (loading) {
    return null; // or a loader
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ admin allowed
  return children;
}
