import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { hasReviewAccess } from "../utils/reviewAccess";

export default function useProfileImage(setResumeData, checkPaymentStatus) {
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setResumeData((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

const openImagePicker = async (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const token = localStorage.getItem("token");

  if (!token) {
    window.dispatchEvent(
      new CustomEvent("openSignupModal", {
        detail: { pendingAction: "profileImage" },
      })
    );
    return;
  }

  const hasPaid = hasReviewAccess(user);

  if (!hasPaid) {
    window.dispatchEvent(
      new CustomEvent("openReviewPopup", {
        detail: { pendingAction: "profileImage" },
      })
    );
    return;
  }

  fileInputRef.current?.click();
};

  useEffect(() => {
    const openPicker = () => {
      fileInputRef.current?.click();
    };

    window.addEventListener("openProfileImagePicker", openPicker);

    return () => {
      window.removeEventListener("openProfileImagePicker", openPicker);
    };
  }, []);

  return {
    fileInputRef,
    handleImageUpload,
    openImagePicker,
  };
}
