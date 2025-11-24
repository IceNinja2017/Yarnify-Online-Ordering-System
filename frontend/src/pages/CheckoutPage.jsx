import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/me`, 
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        setUser(res.data.user);
      } catch (err) {
        toast.error("Please login to continue");
      }
    };
    fetchUser();
  }, []);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/cart/${user._id}`,
          { withCredentials: true }
        );

        const items = res.data.items || [];

        const itemsWithDetails = await Promise.all(
          items.map(async (item) => {
            try {
              const prodRes = await axios.get(
                `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/get-product/${item.productId}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
              );
              return {
                ...item,
                name: prodRes.data.product.name,
                price: Number(prodRes.data.product.price),
              };
            } catch {
              return { ...item, name: "Unknown Product", price: 0 };
            }
          })
        );

        setCartItems(itemsWithDetails);

        const totalAmount = itemsWithDetails.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Handle placing order
  const handlePlaceOrder = async () => {
    if (!user) return toast.error("User not found");

    try {
      if (paymentMethod === "COD") {
        await axios.post(
          `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/cod`,
          { userId: user._id },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        toast.success("Order placed with Cash on Delivery!");
        navigate("/orders")

      } else if (paymentMethod === "PayPal") {
        const res = await axios.post(
          `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/paypal`,
          { userId: user._id },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        // Redirect user to PayPal approval link
        console.log("Paypal: ", res.data)
        if (res.data && res.data.approvalUrl) {
          window.location.href = res.data.approvalUrl;
        } else {
          toast.error("Failed to initiate PayPal payment");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (!user) return <div className="text-center py-10 text-lg">Please login to checkout</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-[#916556]">Checkout</h1>

      {/* Shipping Address */}
      <div className="bg-[#FFF8F7] p-4 rounded-lg border border-[#E7C5BA] mb-6">
        <h2 className="font-semibold text-[#916556] text-lg mb-2">Shipping Address</h2>
        {user?.address ? (
          <p className="text-[#916556] leading-6">
            {user.address.street}, {user.address.city}, {user.address.state} <br />
            {user.address.postalCode}, {user.address.country}
          </p>
        ) : (
          <p className="text-red-500">No address found. Please update your profile.</p>
        )}
      </div>

      {/* Order Summary Table */}
      <h2 className="font-semibold text-[#916556] text-lg mb-2">Order Summary</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-[#fffbff] border border-[#efd7d0] rounded-lg">
          <thead>
            <tr className="bg-[#f3e2dc] text-[#916556]">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-right">Price</th>
              <th className="py-2 px-4 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.productId} className="border-t border-[#efd7d0]">
                  <td className="py-2 px-4 text-[#916556]">{item.name}</td>
                  <td className="py-2 px-4 text-center text-[#916556]">{item.quantity}</td>
                  <td className="py-2 px-4 text-right text-[#916556]">₱{item.price.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right font-semibold text-[#916556]">
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-[#916556]">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
          {cartItems.length > 0 && (
            <tfoot>
              <tr className="border-t border-[#efd7d0] font-bold text-[#916556]">
                <td colSpan={3} className="py-2 px-4 text-right">Total:</td>
                <td className="py-2 px-4 text-right">₱{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Payment Method */}
      <h2 className="font-semibold text-[#916556] text-lg mb-2">Payment Method</h2>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setPaymentMethod("COD")}
          className={`px-4 py-2 rounded-lg ${
            paymentMethod === "COD" ? "bg-[#916556] text-white" : "bg-[#d3ab9e] text-white"
          }`}
        >
          Cash on Delivery
        </button>
        <button
          onClick={() => setPaymentMethod("PayPal")}
          className={`px-4 py-2 rounded-lg ${
            paymentMethod === "PayPal" ? "bg-[#916556] text-white" : "bg-[#d3ab9e] text-white"
          }`}
        >
          PayPal
        </button>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-[#916556] text-white mt-4 py-3 rounded-xl font-semibold hover:opacity-80"
      >
        Confirm & Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;