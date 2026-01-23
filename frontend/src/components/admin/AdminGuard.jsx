import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
console.log("AUTH USER:", user);

  // jab tak user load ho raha hai
  if (loading) {
    return null; // ya loader
  }

  // login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // login hai magar admin nahi
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ admin allowed
  return children;
}
