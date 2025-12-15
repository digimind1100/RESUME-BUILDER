import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SignupModal.css";

export default function SignupModal({ isOpen, onClose, onSuccess }) {
  const { signup, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await signup({ fullName, email, password });

    if (result.ok) {
      onSuccess && onSuccess(result.user);
      onClose();
    } else {
      setError(result.message || "Signup failed. Please try again.");
    }
  }

  return (
    <div className="signup-overlay">
      <div className="signup-modal animate-fadeIn">
        <h2 className="signup-title">Create Your Account</h2>

        {error && <p className="signup-error">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        <button className="signup-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
