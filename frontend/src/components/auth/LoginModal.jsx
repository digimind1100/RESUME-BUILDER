import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "./SignupModal.css";

export default function LoginModal({ onClose }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  const result = await login({ email, password });

if (result.ok) {
  toast.success("Login successful");

  // token save hone ke baad event fire karo
  setTimeout(() => {
    console.log("TOKEN AFTER LOGIN:", localStorage.getItem("token"));

    window.dispatchEvent(new Event("userLoggedIn"));
    window.dispatchEvent(new Event("saveResumeAfterLogin"));
  }, 1000);

  onClose();


  } else {
    toast.error(
      result.message || "Login failed"
    );
  }
}
    return (
      <div className="signup-overlay">
        <div className="signup-modal animate-fadeIn">
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-xs text-gray-500 mt-3"
          >
            Close
          </button>
        </div>
      </div>
    );
  }