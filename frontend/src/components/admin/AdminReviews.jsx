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

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${adminReviewEndpoint}?status=pending`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pending reviews");
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
      setError("Failed to load pending reviews.");
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

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "15px" }}>Pending Reviews</h2>

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
                  {error || "No pending reviews"}
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
                  <span className="badge pending">
                    {review.status || "pending"}
                  </span>
                </td>
                <td>
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(homeReviewChoices[review._id])}
                      disabled={updatingId === review._id}
                      onChange={(event) =>
                        setHomeReviewChoices((prev) => ({
                          ...prev,
                          [review._id]: event.target.checked,
                        }))
                      }
                    />
                    <span>Show on home</span>
                  </label>
                </td>
                <td>
                  <button
                    className="btn approve"
                    disabled={updatingId === review._id}
                    onClick={() => updateStatus(review._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn reject"
                    disabled={updatingId === review._id}
                    onClick={() => updateStatus(review._id, "rejected")}
                  >
                    Reject
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
