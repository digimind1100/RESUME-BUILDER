import { useMemo } from "react";
import { FiCreditCard, FiMessageSquare } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import AdminPendingPayments from "./AdminPendingPayments";
import AdminReviews from "./AdminReviews";
import "./AdminDashboard.css";

const sections = [
  {
    id: "payments",
    label: "Payments",
    description: "Approve or reject pending manual payments.",
    path: "/admin/payments",
    icon: FiCreditCard,
  },
  {
    id: "reviews",
    label: "Reviews",
    description: "Moderate reviews and home page cards.",
    path: "/admin/reviews",
    icon: FiMessageSquare,
  },
];

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = useMemo(() => {
    if (location.pathname.includes("/review")) return "reviews";
    return "payments";
  }, [location.pathname]);

  return (
    <main className="admin-dashboard">
      <aside className="admin-dashboard-sidebar" aria-label="Admin sections">
        <div className="admin-dashboard-brand">
          <span className="admin-dashboard-kicker">Admin</span>
          <h1>Dashboard</h1>
        </div>

        <nav className="admin-dashboard-nav">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={isActive ? "active" : ""}
                onClick={() => navigate(section.path)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon aria-hidden="true" />
                <span>
                  <strong>{section.label}</strong>
                  <small>{section.description}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="admin-dashboard-content">
        {activeSection === "reviews" ? (
          <AdminReviews embedded />
        ) : (
          <AdminPendingPayments embedded />
        )}
      </section>
    </main>
  );
}
