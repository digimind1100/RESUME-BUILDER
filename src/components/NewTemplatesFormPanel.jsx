import React, { useState } from "react";
import "./NewTemplatesFormPanel.css";

export default function NewTemplatesFormPanel({ closePopup, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    dob: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // important!
    onSubmit(formData); // send data to parent / NewTemplateModern
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={closePopup}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn / Portfolio"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <button type="submit">Create Resume</button>
        </form>
      </div>
    </div>
  );
}
