import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function BuilderGuard({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  // Global loader while checking auth
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  // Not logged in → go home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not paid → redirect to payment
  if (!user.isPaid) {
    return (
      <Navigate
        to="/payment"
        replace
        state={{ from: location.pathname }} // 👈 important
      />
    );
  }

  return children;
}
