// src/pages/ResetPasswordPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirm.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#f5eae8]/80 shadow-lg rounded-2xl p-8 border border-[#ebd8d0]">
        <h2 className="text-2xl font-bold text-[#916556] mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#BD8F80] font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#d3ab9e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebd8d0]"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PasswordStrengthMeter password={password}/>

          <div>
            <label className="block text-[#BD8F80] font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#d3ab9e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ebd8d0]"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d3ab9e] text-white py-3 rounded-xl font-semibold hover:bg-[#BD8F80] transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;