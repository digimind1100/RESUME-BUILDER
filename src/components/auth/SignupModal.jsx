// src/components/auth/SignupModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SignupModal.css";

export default function SignupModal({ isOpen, onClose, onSuccess }) {
  const { signup, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">

      {/* Modal box */}
      <div className="bg-white w-[380px] rounded-xl shadow-lg p-6 animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-all"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-gray-600 text-sm w-full underline hover:text-gray-800"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
