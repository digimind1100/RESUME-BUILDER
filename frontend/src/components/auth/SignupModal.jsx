import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SignupModal.css";

export default function SignupModal({ isOpen, onClose, onSuccess }) {
  const { signup, login } = useAuth();

  const [mode, setMode] = useState("signup"); // signup | login
  const [loading, setLoading] = useState(false);


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true); // start loading

    const payload =
      mode === "signup"
        ? {
          fullName: fullName.trim(),
          email: email.trim(),
          password: password.trim(),
        }
        : {
          email: email.trim(),
          password: password.trim(),
        };

    let result;

    try {
      result =
        mode === "signup"
          ? await signup(payload)
          : await login(payload);

      if (result?.ok) {
        const pendingTemplate = localStorage.getItem("pendingTemplate");

        if (pendingTemplate) {
          localStorage.removeItem("pendingTemplate");
          window.location.href = `/resume/${pendingTemplate}`;
          return;
        }

        onSuccess && onSuccess(result.user);
        onClose();
      } else {
        setError(result?.message || "Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("AUTH ERROR:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    }
    finally {
      setLoading(false); // stop loading ALWAYS
    }
  }


  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
    setPassword("");
  }

  return (
    <div className="signup-overlay">
      <div className="signup-modal animate-fadeIn">
        <h2 className="signup-title">
          {mode === "signup"
            ? "Create Your Account"
            : "Login to Your Account"}
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
              <span onClick={() => switchMode("login")}>Login</span>
            </>
          ) : (
            <>
              New here?{" "}
              <span onClick={() => switchMode("signup")}>
                Create account
              </span>
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
