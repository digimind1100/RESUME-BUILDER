import React from "react";
import "./TemplateDrawer.css";

const TemplateDrawer = ({ isOpen, onClose, children }) => {
  return (
    <div>
      {/* Dark overlay */}
      <div className={`drawer-overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      {/* Drawer panel */}
      <div className={`drawer-panel ${isOpen ? "open" : ""}`}>
        <button className="drawer-close" onClick={onClose}>×</button>

        <div className="drawer-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TemplateDrawer;
