import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";

export default function WorkExpPopup({ jobTitle, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [workList, setWorkList] = useState([]);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!jobTitle) return;

    const fetchWork = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("API URL:", API_URL);

        const res = await fetch(`${API_URL}/api/suggest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "work",
            jobTitle,
          }),
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ AI Work Exp:", data);

        if (Array.isArray(data.items) && data.items.length > 0) {
          setWorkList(data.items);
        } else {
          setWorkList([]);
          setError("No work experience suggestions found.");
        }
      } catch (err) {
        console.error("❌ Error fetching AI work:", err);
        setError("Failed to fetch AI work experience.");
        setWorkList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [jobTitle, API_URL]);

  return (
    <div className="popup-overlay">
      <div className="popup-content-box" style={{ position: "relative" }}>
        <div className="popup-scroll">
        <button
          className="top-close-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✖
        </button>

        <h3 className="popup-heading">AI Work Experience for</h3>
        <h4 className="title-heading">{jobTitle}</h4>

        {loading && <p>⏳ Fetching work experience...</p>}

        {!loading && error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}

        {!loading && !error && (
          <ul className="popup-list">
            {workList.map((work, idx) => {
              const cleanText =
                typeof work === "string"
                  ? work.replace(/^[-•\s]+/, "")
                  : work?.text || work?.title || "";

              if (!cleanText) return null;

              return (
                <li
                  key={idx}
                  className="suggestion-item"
                  onClick={() =>
                    onSelect?.({
                      id: Date.now() + idx,
                      title: cleanText,
                      text: cleanText,
                      company: "",
                      years: "",
                      checked: false,
                    })
                  }
                >
                  <span className="plus-btn">+</span>
                  <span className="suggestion-text">{cleanText}</span>
                </li>
              );
            })}
          </ul>
        )}

        <button className="close-btn-popup" onClick={onClose}>
          Close
        </button>
      </div>
      </div>
    </div>
  );
}