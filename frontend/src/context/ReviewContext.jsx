import { createContext, useContext, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import Toast from "../components/Toast";

const ReviewContext = createContext();

export function ReviewProvider({ children, user }) {
  const [showReview, setShowReview] = useState(false);
  const [toast, setToast] = useState(false);

 const triggerReview = () => {
  console.log("🔥 triggerReview CALLED");

  if (!localStorage.getItem("reviewSubmitted")) {
    console.log("✅ review not submitted → opening modal");
    setShowReview(true);
  } else {
    console.log("⛔ review already submitted");
  }
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

      {showReview && (
        <ReviewModal
          userName={user?.name || ""}
          onClose={() => setShowReview(false)}
          onSubmit={submitReview}
        />
      )}

      {toast && (
        <Toast message="Your review has been submitted for approval" />
      )}
    </ReviewContext.Provider>
  );
}

export const useReview = () => useContext(ReviewContext);
