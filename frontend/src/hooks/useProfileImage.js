import { useRef } from "react";

export default function useProfileImage(setResumeData, checkPaymentStatus) {
  const fileInputRef = useRef(null);

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
    window.dispatchEvent(new Event("openSignupModal"));
    return;
  }

  const hasPaid = await checkPaymentStatus();

  if (!hasPaid) {
    window.dispatchEvent(new Event("openPaymentModal"));
    return;
  }

  fileInputRef.current?.click();
};

  return {
    fileInputRef,
    handleImageUpload,
    openImagePicker,
  };
}