import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  // Base colors
  const colors = {
    bg: "#fffbff",
    card: "#ebd8d0",
    accent: "#d3ab9e",
    text: "#333",
  };

  // Payment status colors
  const paymentColors = {
    Paid: { bg: "#4CAF50", text: "white" },      // Green
    Unpaid: { bg: "#FFEB3B", text: colors.text }, // Yellow
    Canceled: { bg: "#F44336", text: "white" },  // Red
    Default: { bg: colors.bg, text: colors.text },
  };

  // Order status colors
  const statusColors = {
    Pending: { bg: "#FFEB3B", text: colors.text },   // Yellow
    Shipped: { bg: "#2196F3", text: "white" },       // Blue
    Completed: { bg: "#4CAF50", text: "white" },     // Green
    Canceled: { bg: "#F44336", text: "white" },      // Red
    Default: { bg: colors.bg, text: colors.text },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/orders`, { withCredentials: true });
        const ordersData = res.data.orders || res.data || [];

        const enrichedOrders = await Promise.all(
          ordersData.map(async (order) => {
            // Fetch user
            let user = { user: { username: "Unknown", email: "Unknown" } };
            try {
              const userRes = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/${order.userId}`);
              user = userRes.data || user;
            } catch (err) {
              console.warn(`Failed to fetch user ${order.userId}:`, err);
            }

            // Fetch product info for items
            const items = await Promise.all(
              order.items.map(async (item) => {
                let product = { product: { name: "Product", price: 0 } };
                try {
                  const productRes = await axios.get(
                    `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/get-product/${item.productId}`
                  );
                  product = productRes.data || product;
                } catch (err) {
                  console.warn(`Failed to fetch product ${item.productId}:`, err);
                }
                return { ...item, product };
              })
            );

            return { ...order, user, items };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await axios.put(
        `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/update/${orderId}`,
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
      <div className="w-full flex justify-center items-center h-40" style={{ color: colors.text }}>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const statusOptions = ["Pending", "Shipped", "Completed", "Canceled"];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg font-semibold">No Orders Found</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="rounded-xl shadow p-6" style={{ backgroundColor: colors.card }}>

              {/* Order Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 mb-4 text-sm md:text-base">
                <p className="font-medium">Order ID:</p>
                <p className="truncate">{order._id}</p>
                <p className="font-medium">Created At:</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>

                <p className="font-medium">Username:</p>
                <p>{order.user?.user.username || "Unknown"}</p>

                <p className="font-medium">Payment Status:</p>
                <p style={{
                  backgroundColor: paymentColors[order.paymentStatus]?.bg || paymentColors.Default.bg,
                  color: paymentColors[order.paymentStatus]?.text || paymentColors.Default.text,
                  padding: "2px 6px",
                  borderRadius: "8px",
                  display: "inline-block",
                  fontWeight: "bold"
                }}>
                  {order.paymentStatus}
                </p>

                <p className="font-medium">Payment Method:</p>
                <p>{order.paymentMethod}</p>

                <p className="font-medium">Status:</p>
                <p style={{
                  backgroundColor: statusColors[order.status]?.bg || statusColors.Default.bg,
                  color: statusColors[order.status]?.text || statusColors.Default.text,
                  padding: "2px 6px",
                  borderRadius: "8px",
                  display: "inline-block",
                  fontWeight: "bold"
                }}>
                  {order.status}
                </p>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Items</h2>
                <div className="border-2 border-black">
                  <div className="grid grid-cols-12 p-2 font-bold border-b border-black text-sm md:text-base">
                    <p className="col-span-8">Item Name</p>
                    <p className="col-span-2 text-right">Price</p>
                    <p className="col-span-2 text-right">Quantity</p>
                  </div>
                  {order.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 p-2 border-b border-gray-400 last:border-b-0 text-sm md:text-base">
                      <p className="col-span-8 truncate">{item.product?.product.name || "Product"}</p>
                      <p className="col-span-2 text-right">₱{item.product?.product.price.toFixed(2)}</p>
                      <p className="col-span-2 text-right">{item.quantity}</p>
                    </div>
                  ))}
                  <div className="flex justify-end p-2 font-bold text-lg border-t border-black" style={{ backgroundColor: colors.accent, color: 'white' }}>
                    <p>Total: ₱{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="mt-6 flex flex-wrap gap-2 justify-end">
                {statusOptions.map((s) => {
                  const style = statusColors[s] || statusColors.Default;
                  return (
                    <button
                      key={s}
                      disabled={updating === order._id}
                      onClick={() => updateStatus(order._id, s)}
                      className="px-3 py-1 rounded-xl text-sm transition duration-150 ease-in-out hover:opacity-80 disabled:opacity-50"
                      style={{
                        backgroundColor: order.status === s ? style.bg : colors.bg,
                        color: order.status === s ? style.text : colors.text,
                        border: `1px solid ${colors.accent}`,
                      }}
                    >
                      {updating === order._id ? <Loader2 className="animate-spin h-4 w-4" /> : s}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;