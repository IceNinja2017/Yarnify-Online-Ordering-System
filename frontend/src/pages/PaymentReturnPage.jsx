import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentReturnPage = () => {
  const [status, setStatus] = useState("Processing payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("token"); // PayPal order ID
    const payerId = urlParams.get("PayerID"); // optional

    if (!orderId) {
      setStatus("No order token found.");
      return;
    }

    // Call backend to capture PayPal payment
    axios
      .post(
        `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/capture-paypal-order`,
        { orderId, payerId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((response) => {
        console.log("Payment capture response:", response.data);
        setStatus("Payment successful! Thank you for your purchase.");

        toast.success("Payment Successful");

        setTimeout(() => navigate("/orders"), 2000);
      })
      .catch((error) => {
        console.error("Error capturing payment:", error);
        setStatus("Payment failed. Please try again.");
      });
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 text-center text-lg text-[#916556]">
      {status}
    </div>
  );
};

export default PaymentReturnPage;