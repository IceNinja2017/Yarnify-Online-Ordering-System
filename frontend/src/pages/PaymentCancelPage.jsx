import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentCanceledPage = () => {
  const [status, setStatus] = useState("Processing cancellation...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paypalOrderId = urlParams.get("token");

    if (!paypalOrderId) {
      setStatus("No PayPal token provided.");
      return;
    }

    // Call backend to mark order as canceled
    axios.post(
      `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/cancel-paypal-order`,
      { paypalOrderId },
      { withCredentials: true }
    )
      .then((res) => {
        setStatus("Payment canceled. Your order has been marked as canceled.");
        toast.error("Payment canceled.");
      })
      .catch((err) => {
        console.error(err);
        setStatus("Failed to update order status.");
        toast.error("Failed to update order status.");
      });
  }, [location]);

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Canceled</h1>
      <p className="mb-6">{status}</p>
      <button
        onClick={() => navigate("/orders")}
        className="bg-[#916556] text-white px-6 py-2 rounded-lg hover:opacity-80"
      >
        Return to Orders
      </button>
    </div>
  );
};

export default PaymentCanceledPage;