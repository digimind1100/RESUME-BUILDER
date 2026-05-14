import React from "react";

const TemplateLayout = ({
  children,
  onSave,
  onPreview
}) => {

   const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };
  
  return (
    <div className="template-layout">

      {/* Top Bar */}
      <div className="toolbar">

        <button
          onClick={onSave}
          onTouchEnd={onSave}
        >
          Save
        </button>

        <button onClick={onPreview}>
          Preview
        </button>

         <button onClick={handleReset}>
          Reset
        </button>

      </div>

      {/* Resume Content */}
      <div className="content">
        {children}
      </div>

    </div>
  );
};

export default TemplateLayout;