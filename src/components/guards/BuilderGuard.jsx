import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function BuilderGuard({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

console.log("FINAL GUARD CHECK:", user, initializing);


  // 🔄 wait until auth finishes loading
  if (initializing) {
    return <div className="p-6">Checking access...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ❌ logged in but not paid
  if (!user.isPaid) {
    return (
      <Navigate
        to="/payment"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ✅ logged in + paid
  return children;
}
