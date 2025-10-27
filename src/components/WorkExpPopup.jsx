import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";

export default function WorkExpPopup({ jobTitle, onClose, onSelect }) {
  const [loading, setLoading] = useState(true);
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    if (!jobTitle) return;
    const fetchWork = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "work", jobTitle }),
        });
        const data = await res.json();
        console.log("✅ AI Work Exp:", data);

        if (Array.isArray(data.work) && data.work.length > 0) {
          setWorkList(data.work);
        } else {
          setWorkList(["No work experience suggestions found."]);
        }
      } catch (err) {
        console.error("❌ Error fetching AI work:", err);
        setWorkList(["Error fetching work experience."]);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [jobTitle]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ position: "relative" }}>
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

        <h3>AI Work Experience for "{jobTitle}"</h3>

        {loading ? (
          <p>⏳ Fetching work experience...</p>
        ) : (
          <ul className="popup-list">
            {workList.map((work, idx) => {
              const cleanText =
                typeof work === "string"
                  ? work.replace(/^[-•\s]+/, "")
                  : work.text || work.title || "";

              return (
                <li
                  key={idx}
                  className="suggestion-item"
                  onClick={() => {
                    const newWork = {
                      id: Date.now() + idx,
                      title: cleanText,
                      text: cleanText,
                      company: "",
                      years: "",
                      checked: false,
                    };
                    console.log("👉 Work selected:", newWork);
                    if (typeof onSelect === "function") {
                      onSelect(newWork);
                    }
                    // DO NOT CLOSE POPUP
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span className="plus-btn">+</span>
                  <span className="suggestion-text">{cleanText}</span>
                </li>
              );
            })}
          </ul>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
