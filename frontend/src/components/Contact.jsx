import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://resume-builder-backend-production-116d.up.railway.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.error || "❌ Failed to send message.");
      }
    } catch (error) {
      alert("❌ Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>

        <p className="contact-description">
          If you have any questions, payment issues, refund requests, or need
          technical support, please contact us using the details below or the form.
        </p>

        

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Business Contact Information */}
        <div className="contact-info-box">
          <h3>Business Information</h3>
          <p><strong>Business Name:</strong> Resume Builder</p>
          <p><strong>Business Type:</strong> Sole Proprietor</p>
          <p><strong>Email:</strong> suhz1100@gmail.com</p>
          <p><strong>Phone:</strong> 0318-2899723</p>
          <p>
            <strong>Address:</strong>Block 10-A,
            Gulshan-e-Iqbal, Karachi, Pakistan
          </p>
          <p><strong>Support Hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM (PKT)</p>
        </div>

        </form>
      </div>
    </div>
  );
}