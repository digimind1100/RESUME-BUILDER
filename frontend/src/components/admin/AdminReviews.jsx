import { useEffect, useState } from "react";
import "./adminTable.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "https://resume-builder-backend-66wy.onrender.com/api";

const adminReviewEndpoint = API_BASE.endsWith("/api")
  ? `${API_BASE}/admin/review`
  : `${API_BASE}/api/admin/review`;

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [homeReviewChoices, setHomeReviewChoices] = useState({});
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    fetchReviews(statusFilter);
  }, [statusFilter]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchReviews = async (status) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${adminReviewEndpoint}?status=${status}`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch ${status} reviews`);
      }

      const data = await res.json();
      const nextReviews = Array.isArray(data) ? data : data.reviews || [];

      setReviews(nextReviews);
      setHomeReviewChoices(
        nextReviews.reduce((choices, review) => {
          choices[review._id] = Boolean(review.showOnHome);
          return choices;
        }, {})
      );
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setError(`Failed to load ${status} reviews.`);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const showOnHome = Boolean(homeReviewChoices[id]);

      const res = await fetch(
        `${adminReviewEndpoint}/${id}/${status === "approved" ? "approve" : "reject"}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status, showOnHome }),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setReviews((prev) => prev.filter((review) => review._id !== id));
      setHomeReviewChoices((prev) => {
        const nextChoices = { ...prev };
        delete nextChoices[id];
        return nextChoices;
      });
    } catch (err) {
      console.error("Review status update failed:", err.message);
      alert("Action failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateHomeCard = async (id, showOnHome) => {
    try {
      setUpdatingId(id);
      setHomeReviewChoices((prev) => ({ ...prev, [id]: showOnHome }));

      const res = await fetch(`${adminReviewEndpoint}/${id}/approve`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: "approved", showOnHome }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      const updatedReview = data.review;

      if (updatedReview?._id) {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
      }
    } catch (err) {
      console.error("Home card update failed:", err.message);
      alert("Home card update failed");
      fetchReviews(statusFilter);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "15px" }}>Reviews</h2>

      <div className="admin-tabs" aria-label="Review status filter">
        <button
          className={statusFilter === "pending" ? "active" : ""}
          onClick={() => setStatusFilter("pending")}
          type="button"
        >
          Pending
        </button>
        <button
          className={statusFilter === "approved" ? "active" : ""}
          onClick={() => setStatusFilter("approved")}
          type="button"
        >
          Approved
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>USER</th>
              <th>RATING</th>
              <th>COMMENT</th>
              <th>STATUS</th>
              <th>HOME CARD</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading && reviews.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  {error || `No ${statusFilter} reviews`}
                </td>
              </tr>
            )}

            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.name || review.user?.name || "Anonymous"}</td>
                <td>{review.rating} star</td>
                <td style={{ maxWidth: "300px" }}>
                  {review.comment || review.review || "-"}
                </td>
                <td>
                  <span className={`badge ${review.status || statusFilter}`}>
                    {review.status || statusFilter}
                  </span>
                </td>
                <td>
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(homeReviewChoices[review._id])}
                      disabled={updatingId === review._id}
                      onChange={(event) => {
                        const checked = event.target.checked;

                        if (statusFilter === "approved") {
                          updateHomeCard(review._id, checked);
                          return;
                        }

                        setHomeReviewChoices((prev) => ({
                          ...prev,
                          [review._id]: checked,
                        }));
                      }}
                    />
                    <span>
                      {statusFilter === "approved"
                        ? homeReviewChoices[review._id]
                          ? "Yes"
                          : "No"
                        : "Show on home"}
                    </span>
                  </label>
                </td>
                <td>
                  {statusFilter === "pending" && (
                    <button
                      className="btn approve"
                      disabled={updatingId === review._id}
                      onClick={() => updateStatus(review._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="btn reject"
                    disabled={updatingId === review._id}
                    onClick={() => updateStatus(review._id, "rejected")}
                  >
                    {statusFilter === "approved" ? "Remove" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
