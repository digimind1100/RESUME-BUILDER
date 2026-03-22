import React, { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeBlock({ canEdit, isEditable }) {
  const [qrImage, setQrImage] = useState("/images/default-qr.png");

  const generateQR = async (data) => {
    try {
      const qr = await QRCode.toDataURL(data || "Resume");
      setQrImage(qr);
    } catch (err) {
      console.error(err);
    }
  };

return (
  <div className="neo-qr-block">
    <img src={qrImage} alt="QR" className="neo-qr-img" />

    {canEdit && isEditable && (
      <button className="neo-qr-btn" onClick={() => generateQR("User Data")}>
        Generate
      </button>
    )}
  </div>
);
}