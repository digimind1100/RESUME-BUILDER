import React from "react";

export default function TemplateLayout({
  children,
  onSave,
  onPreview
}) {
  return (
    <div>
      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <button onClick={onSave}>💾 Save</button>
        <button onClick={onPreview}>👁 Preview</button>
      </div>

      {/* TEMPLATE CONTENT */}
      {children}
    </div>
  );
}

const styles = {
  toolbar: {
    position: "sticky",
    top: 0,
    zIndex: 9999,
    background: "#fff",
    padding: "10px",
    display: "flex",
    gap: "10px",
    borderBottom: "1px solid #ddd"
  }
};
