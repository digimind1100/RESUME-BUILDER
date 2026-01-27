import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";

export default function SkillsPopup({ jobTitle, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!jobTitle) return;

    const fetchSkills = async () => {
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
            type: "skills",
            jobTitle,
          }),
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ AI Skills:", data);

        if (Array.isArray(data.items) && data.items.length > 0) {
          setSkillsList(data.items);
        } else {
          setSkillsList([]);
          setError("No skills suggestions found.");
        }
      } catch (err) {
        console.error("❌ Error fetching AI skills:", err);
        setError("Failed to fetch AI skills.");
        setSkillsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [jobTitle, API_URL]);

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

        <h3>AI Skills for "{jobTitle}"</h3>

        {loading && <p>⏳ Fetching skills...</p>}

        {!loading && error && (
          <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
        )}

        {!loading && !error && (
          <ul className="popup-list">
            {skillsList.map((skill, idx) => {
              const cleanText =
                typeof skill === "string"
                  ? skill.replace(/^[-•\s]+/, "")
                  : skill?.text || "";

              if (!cleanText) return null;

              return (
                <li
                  key={idx}
                  className="suggestion-item"
                  onClick={() =>
                    onSelect?.({
                      id: Date.now() + idx,
                      text: cleanText,
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

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
