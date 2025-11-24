import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateModal from "../components/UpdateModal";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // For modal

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/all-products`,
        { withCredentials: true }
      );
      setItems(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/product/${id}`);
      toast.success("Item deleted");
      fetchItems(); // Refresh inventory after delete
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const shorten = (text) => {
    if (!text) return "";
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#fffbff" }}>
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "#d3ab9e" }}
      >
        Inventory
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl shadow p-4 flex flex-col"
            style={{ backgroundColor: "#fefeff" }}
          >
            <img
              src={item.image?.[0]?.url}
              alt={item.name}
              className="rounded-xl h-48 w-full object-cover"
            />

            <h2
              className="text-xl font-bold mt-3"
              style={{ color: "#d3ab9e" }}
            >
              {item.name}
            </h2>
            <p className="text-md mt-1" style={{ color: "#eac9c1" }}>
              {shorten(item.description)}
            </p>

            <div className="mt-2 text-sm" style={{ color: "#ebd8d0" }}>
              <p>Stock: {item.stock}</p>
              <p>Category: {item.category}</p>
              <p
                className="text-lg font-semibold mt-1"
                style={{ color: "#d3ab9e" }}
              >
                ₱{item.price}
              </p>
            </div>

            <div className="mt-auto flex gap-3 pt-4">
              <button
                className="w-full py-2 rounded-xl font-semibold hover:opacity-90"
                style={{ backgroundColor: "#d3ab9e", color: "#fff" }}
                onClick={() => setSelectedItem(item)}
              >
                Update
              </button>

              <button
                className="w-full py-2 rounded-xl font-semibold hover:opacity-90"
                style={{ backgroundColor: "#eac9c1", color: "#fff" }}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {selectedItem && (
        <UpdateModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          refreshInventory={fetchItems} // Refetch after update
        />
      )}
    </div>
  );
};

export default InventoryPage;