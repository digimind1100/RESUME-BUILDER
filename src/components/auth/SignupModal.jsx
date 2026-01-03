import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SignupModal.css";

export default function SignupModal({ isOpen, onClose, onSuccess }) {
  const { signup, login, loading } = useAuth();

  const [mode, setMode] = useState("signup"); // signup | login

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    let result;

    if (mode === "signup") {
      result = await signup({ fullName, email, password });
    } else {
      result = await login({ email, password });
    }

    if (result?.ok) {
      onSuccess && onSuccess(result.user);
      onClose();
    } else {
      setError(result?.message || "Authentication failed. Please try again.");
    }
  }




  
  return (
    <div className="signup-overlay">
      <div className="signup-modal animate-fadeIn">
        <h2 className="signup-title">
          {mode === "signup" ? "Create Your Account" : "Login to Your Account"}
        </h2>

        {error && <p className="signup-error">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? mode === "signup"
                ? "Creating Account..."
                : "Logging in..."
              : mode === "signup"
              ? "Signup"
              : "Login"}
          </button>
        </form>

        <p className="signup-switch">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </>
          ) : (
            <>
              New here?{" "}
              <span onClick={() => setMode("signup")}>Create account</span>
            </>
          )}
        </p>

        <button className="signup-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
