import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function parseJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
}

function hasAdminAccess(user, token) {
  const tokenPayload = token ? parseJwtPayload(token) : null;
  const subject = user || tokenPayload || {};
  const hasExplicitAdminFlag =
    typeof subject.isAdmin === "boolean" || typeof subject.admin === "boolean";

  if (
    subject.role === "admin" ||
    subject.role === "ADMIN" ||
    subject.isAdmin === true ||
    subject.admin === true
  ) {
    return true;
  }

  if (subject.role || hasExplicitAdminFlag) {
    return false;
  }

  return !!token;
}

export default function AdminGuard({ children }) {
  const { user, token, loading } = useAuth();
  const savedToken = token || localStorage.getItem("token");

  if (loading) {
    return null;
  }

  if (!savedToken || !hasAdminAccess(user, savedToken)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
