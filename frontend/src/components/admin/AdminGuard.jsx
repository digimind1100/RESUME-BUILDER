import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  // ⏳ wait until auth is resolved
  if (loading) {
    return null; // or loader
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ not admin (support all common admin flags)
  const isAdmin =
    user.role === "admin" ||
    user.role === "ADMIN" ||
    user.isAdmin === true;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ admin allowed
  return children;
}
