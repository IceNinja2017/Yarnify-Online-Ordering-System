// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Reset code sent to your email");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to send reset request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#f5eae8]/80 shadow-lg rounded-2xl p-8 border border-[#ebd8d0]">
        <h2 className="text-2xl font-bold text-[#916556] mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#BD8F80] font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#d3ab9e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebd8d0]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d3ab9e] text-white py-3 rounded-xl font-semibold hover:bg-[#BD8F80] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-[#BD8F80] hover:text-[#916556]">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;