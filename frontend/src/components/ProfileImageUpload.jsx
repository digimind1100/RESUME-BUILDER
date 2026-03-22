import React, { useRef, useState } from "react";

export default function ProfileImageUpload({
  canEdit,
  isEditable,
  requirePayment,
  className = "",
  imgClass = "",
  defaultImage = "/images/cleanprofileimage.png"
}) {
  const [profileImage, setProfileImage] = useState(defaultImage);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const handleClick = () => {
    if (!canEdit) {
      if (requirePayment) requirePayment();
      return;
    }
    if (!isEditable) return;

    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${className} ${!canEdit ? "locked" : ""}`}
      onClick={handleClick}
    >
      <img src={profileImage} alt="Profile" className={imgClass} />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}