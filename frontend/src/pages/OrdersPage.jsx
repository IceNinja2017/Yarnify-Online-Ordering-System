// src/pages/OrdersPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState({
    current: [],
    completed: [],
    canceled: [],
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch orders once user is loaded
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/payment/orders/${user._id}`
        );
        const allOrders = res.data; // this should be an array of orders from your backend

        // Group orders by status
        const groupedOrders = {
          current: allOrders.filter(
            (o) => o.status === "Pending" || o.status === "Processing"
          ),
          completed: allOrders.filter((o) => o.status === "Delivered"),
          canceled: allOrders.filter((o) => o.status === "Canceled"),
        };

        setOrders(groupedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const OrderTable = ({ title, data }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#BD8F80] mb-4">{title}</h2>
      {loading ? (
        <p className="text-[#916556]">Loading...</p>
      ) : !data || data.length === 0 ? (
        <p className="text-[#916556]">No orders here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#ebd8d0] rounded-xl shadow-md">
            <thead>
              <tr className="text-left text-[#BD8F80]">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="border-t border-[#d3ab9e]">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">₱{order.totalAmount}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      order.status === "Canceled"
                        ? "text-red-500"
                        : order.status === "Delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2">{order.paymentMethod}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      order.paymentStatus === "Unpaid " || order.paymentStatus === "Canceled" 
                        ? "text-red-500"
                        : order.paymentStatus === "Paid"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-[#fffbff] min-h-screen">
      <h1 className="text-3xl font-bold text-[#BD8F80] mb-6">My Orders</h1>
      <OrderTable title="Current Orders" data={orders.current} />
      <OrderTable title="Completed Orders" data={orders.completed} />
      <OrderTable title="Canceled Orders" data={orders.canceled} />
    </div>
  );
};

export default OrdersPage;
