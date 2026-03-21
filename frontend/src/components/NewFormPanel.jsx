import React from "react";

export default function NewFormPanel({ formData, setFormData }) {

  return (
    <div>

      <h2>Basic Info</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Job Title"
        value={formData.jobTitle || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            jobTitle: e.target.value
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value
          })
        }
      />

    </div>
  );
}