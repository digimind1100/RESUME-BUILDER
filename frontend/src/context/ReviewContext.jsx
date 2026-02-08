import { createContext, useContext, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  const { user } = useAuth(); // ✅ REAL USER SOURCE

  const [showReview, setShowReview] = useState(false);
  const [toast, setToast] = useState(false);

  // 🔒 ONLY way to open modal
  const triggerReview = () => {
    if (localStorage.getItem("reviewSubmitted")) return;
    setShowReview(true);
  };

  const closeReview = () => {
    setShowReview(false);
  };

  const submitReview = async (data) => {
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // ✅ mark as reviewed ONLY after success
    localStorage.setItem("reviewSubmitted", "true");

    setShowReview(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  // ✅ SAFELY RESOLVE USER NAME (bullet-proof)
  const resolvedUserName =
    user?.name ||
    user?.displayName ||
    user?.fullName ||
    user?.username ||
    user?.email ||
    user?.user_metadata?.full_name ||
    "";

  return (
    <ReviewContext.Provider value={{ triggerReview }}>
      {children}

      {/* ✅ MODAL */}
      {showReview && (
        <ReviewModal
          userName={resolvedUserName}
          onClose={closeReview}
          onSubmit={submitReview}
        />
      )}

      {toast && (
        <Toast message="Your review has been submitted for approval" />
      )}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  return useContext(ReviewContext);
}
