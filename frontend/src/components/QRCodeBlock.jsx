import React, { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeBlock({ canEdit, isEditable }) {

  const [qrImage, setQrImage] = useState("/images/default-qr.png"); // ✅ dummy

  const generateQR = async (data) => {
    if (!data || data.trim() === "") return;

    try {
      const qr = await QRCode.toDataURL(data);
      setQrImage(qr);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="neo-qr-block">

      <img src={qrImage} alt="QR" className="neo-qr-img" />

      {canEdit && isEditable && (
        <button
          className="neo-qr-btn"
          onClick={() => generateQR("https://alexmorgan.dev")}
        >
          Generate QR
        </button>
      )}

    </div>
  );
}