import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";

export default function WorkExpPopup({ jobTitle, onClose, onSelect }) {
  const [workList, setWorkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchWorkSuggestions = async () => {
      try {
        setLoading(true);
        const resp = await fetch("http://localhost:3001/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobTitle: jobTitle || "Software Engineer", type: "work" }),
        });
        const data = await resp.json();
        console.log("✅ AI Work Experience Suggestions:", data);
        if (!mounted) return;
        if (data && Array.isArray(data.work)) {
          // ensure everything is string and trimmed
          setWorkList(data.work.map((it) => (typeof it === "string" ? it.trim() : JSON.stringify(it))));
        } else {
          setWorkList(["⚠️ No suggestions found. Try another job title."]);
        }
      } catch (err) {
        console.error("❌ Error fetching work experience:", err);
        if (mounted) setWorkList(["⚠️ Failed to fetch suggestions. Check server."]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWorkSuggestions();
    return () => {
      mounted = false;
    };
  }, [jobTitle]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" role="dialog" aria-modal="true" style={{ position: "relative" }}>
        {/* Top-right close button */}
        <button
          className="top-close-btn"
          onClick={() => {
            console.log("📌 Top-right close clicked");
            if (typeof onClose === "function") onClose();
          }}
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

        {/* Popup title */}

        <h3 className="popup-title">AI Work Experience Suggestions</h3>

        {loading ? (
          <p className="loading-text">⏳ Loading suggestions...</p>
        ) : (
          <ul className="suggestion-list">
            {workList.map((item, index) => {
              const cleanText = String(item).trim();

              return (
                <li
                  key={index}
                  className="suggestion-item"
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                  onClick={() => {
                    const newExp = {
                      id: Date.now() + index,
                      title: cleanText,
                      text: cleanText,
                      company: "",
                      years: "",
                    };

                    console.log("👉 Popup selected (will send to parent):", newExp);

                    if (typeof onSelect === "function") {
                      onSelect(newExp);
                    } else if (typeof onAddWork === "function") {
                      onAddWork(newExp);
                    } else if (typeof onAdd === "function") {
                      onAdd(newExp);
                    } else {
                      console.warn("No add handler provided by parent (onSelect / onAddWork / onAdd).");
                    }
                  }}
                >
                  <span className="plus-btn" aria-hidden style={{ userSelect: "none" }}>+</span>
                  <span className="suggestion-text">{cleanText}</span>
                </li>

              );
            })}

          </ul>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button
            type="button"
            className="close-btn"
            onClick={() => {
              console.log("📌 WorkExpPopup: close clicked");
              if (typeof onClose === "function") onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
