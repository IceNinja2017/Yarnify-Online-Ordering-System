import { useEffect, useState } from "react";
import axios from "axios";


import { Loader2 } from "lucide-react";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const colors = {
    bg: "#fffbff",
    card: "#ebd8d0",
    accent: "#d3ab9e",
    text: "#333",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/payment/orders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await axios.put(
        `http://localhost:5001/api/payment/update/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-40 text-black">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div className="rounded-2xl shadow p-4" style={{ backgroundColor: colors.card }} >
            <div className="p-2">
              <div className="space-y-3">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>User:</strong> {order.user?.email || "Unknown"}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <div>
                  <p className="font-semibold">Items:</p>
                  <ul className="list-disc ml-6">
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.product?.name || "Unnamed"} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-4">
                  {["Pending", "Processing", "Completed", "Cancelled"].map(
                    (s) => (
                      <button
                        key={s}
                        disabled={updating === order._id}
                        onClick={() => updateStatus(order._id, s)}
                        className="px-3 py-1 rounded-xl text-sm"
                        style={{
                          backgroundColor:
                            order.status === s ? colors.accent : "#fefeff",
                          color: order.status === s ? "white" : colors.text,
                        }}
                      >
                        {updating === order._id ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          s
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderPage;