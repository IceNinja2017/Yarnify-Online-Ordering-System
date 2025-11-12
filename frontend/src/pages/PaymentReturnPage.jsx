import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentReturnPage = () => {
  const [status, setStatus] = useState("Processing payment...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("token"); // this is your order ID
    const payerId = urlParams.get("PayerID"); // optional, sometimes used
    const navigate = useNavigate();

    if (!orderId) {
      setStatus("No order token found.");
      return;
    }

    // Call your backend to capture the order
    axios.post("http://localhost:5001/api/payment/capture-paypal-order", { orderId, payerId }, { withCredentials: true })
        .then((response) => {
          console.log("Payment capture response:", response.data);
          setStatus("Payment successful! Thank you for your purchase.");
          navigate("/thank-you");
        })
        .catch((error) => {
          console.error("Error capturing payment:", error);
          setStatus("Payment failed. Please try again.");
        });
    }, []);

  return <div>{status}</div>;
};

export default PaymentReturnPage;
