// src/components/auth/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (result.ok) {
      onSuccess && onSuccess(result.user);
      onClose();
    } else {
      setError(result.message || "Login failed. Try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">
      <div className="bg-white w-[380px] rounded-xl shadow-lg p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button className="mt-4 w-full text-sm text-gray-600 underline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
