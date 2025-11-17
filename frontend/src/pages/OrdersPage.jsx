// src/pages/OrdersPage.jsx
import { useState } from "react";

const OrdersPage = () => {
  const [orders] = useState({
    current: [
      { id: 1, item: "Crochet Hat", quantity: 2, total: "$40", status: "Processing" },
      { id: 2, item: "Knitting Scarf", quantity: 1, total: "$35", status: "Shipped" },
    ],
    completed: [
      { id: 3, item: "Wool Yarn Pack", quantity: 3, total: "$45", status: "Delivered" },
    ],
    canceled: [
      { id: 4, item: "Crochet Amigurumi", quantity: 1, total: "$25", status: "Canceled" },
    ],
  });

  const OrderTable = ({ title, data }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#BD8F80] mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-[#916556]">No orders here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#ebd8d0] rounded-xl shadow-md">
            <thead>
              <tr className="text-left text-[#BD8F80]">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id} className="border-t border-[#d3ab9e]">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.item}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className={`px-4 py-2 font-semibold ${
                    order.status === "Canceled" ? "text-red-500" :
                    order.status === "Delivered" ? "text-green-500" : "text-yellow-500"
                  }`}>{order.status}</td>
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