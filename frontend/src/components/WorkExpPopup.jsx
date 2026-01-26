import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";
import API from "../api/authApi"; // ✅ use central axios instance

export default function WorkExpPopup({ jobTitle, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [workList, setWorkList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobTitle) {
      setLoading(false);
      setWorkList([]);
      return;
    }

    const fetchWork = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.post("/suggest", {
          type: "work",
          jobTitle,
        });

        console.log("✅ AI Work Exp:", res.data);

        const items = res?.data?.items;

        if (Array.isArray(items) && items.length > 0) {
          setWorkList(items);
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
  }, [jobTitle]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ position: "relative" }}>
        {/* Close Button */}
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

        {/* Loading */}
        {loading && <p>⏳ Fetching work experience...</p>}

        {/* Error */}
        {!loading && error && (
          <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
        )}

        {/* Results */}
        {!loading && !error && (
          <ul className="popup-list">
            {workList.map((work, idx) => {
              const cleanText =
                typeof work === "string"
                  ? work.replace(/^[-•\s]+/, "")
                  : work.text || work.title || "";

              if (!cleanText) return null;

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
                    // ❗ popup stays open intentionally
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
