import { createContext, useContext, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import Toast from "../components/Toast";

const ReviewContext = createContext(null);

export function ReviewProvider({ children, user }) {
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

    localStorage.setItem("reviewSubmitted", "true");
    setShowReview(false);
    setToast(true);

    setTimeout(() => setToast(false), 3000);
  };

  return (
    <ReviewContext.Provider value={{ triggerReview }}>
      {children}

      {/* 🚫 MODAL DOES NOT EXIST UNLESS showReview === true */}
      {showReview ? (
        <ReviewModal
          userName={user?.name || ""}
          onClose={closeReview}
          onSubmit={submitReview}
        />
      ) : null}

      {toast ? (
        <Toast message="Your review has been submitted for approval" />
      ) : null}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  return useContext(ReviewContext);
}
