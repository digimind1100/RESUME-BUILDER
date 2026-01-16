import { useState } from "react";
import { FaTimes, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./ShareResume.css";
import { shareResumeAsImage } from "../utils/shareResumeAsImage";

const ShareResume = ({ resumeRef, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  // ✅ IMAGE-BASED WHATSAPP SHARE
const handleWhatsAppShare = async () => {
  const imageData = await shareResumeAsImage(resumeRef);
  if (!imageData) return;

  // ✅ Auto-download resume image
  const link = document.createElement("a");
  link.href = imageData;
  link.download = "resume.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // ✅ Open WhatsApp with clear message
  const message =
    "I’ve shared my resume image. Please find it attached here.";
  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};


  // ⏳ Email (kept as-is, for later)
  const shareEmail = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/share/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Resume sent successfully");
      onClose();
    } catch (err) {
      alert(err.message || "Email failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-panel" onClick={(e) => e.stopPropagation()}>
        <button className="share-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h3>Share your resume</h3>

        {/* WhatsApp IMAGE */}
        <button className="share-btn whatsapp" onClick={handleWhatsAppShare}>
          <FaWhatsapp />
          WhatsApp (Image)
        </button>

        <p className="share-helper-text">
  The resume image will download automatically.  
  Please attach it in WhatsApp.
</p>


        {/* Email PDF (later) */}
        <button
          className="share-btn email"
          onClick={shareEmail}
          disabled={loading}
        >
          <FaEnvelope />
          {loading ? "Sending..." : "Email"}
        </button>

        <input
          type="email"
          className="share-email-input"
          placeholder="Recipient email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ShareResume;
