import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { markUserPaid } from "../../api/paymentApi";

export default function PaymentPage() {
  const { user, token, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // where user came from (builder route)
  const redirectTo = location.state?.from;

  useEffect(() => {
    toast.error("Please complete payment to access this template");
  }, []);

  async function handlePaymentSuccess() {
    if (!token) {
      toast.error("Authentication error. Please login again.");
      navigate("/");
      return;
    }

    setLoading(true);

    const result = await markUserPaid(token);

    setLoading(false);

    if (result.ok && result.user) {
      // 🔥 REAL payment state from MongoDB
      setUser(result.user);

      toast.success("Payment successful!");

      // redirect back to builder
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/");
      }
    } else {
      toast.error(result.message || "Payment failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[360px] text-center">
        <h2 className="text-xl font-semibold mb-2">Payment Required</h2>
        <p className="text-sm text-gray-600 mb-4">
          Complete payment to unlock this resume template.
        </p>

        <button
          onClick={handlePaymentSuccess}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <p className="text-xs text-gray-400 mt-3">
          (Test payment — real gateway will be added later)
        </p>
      </div>
    </div>
  );
}
