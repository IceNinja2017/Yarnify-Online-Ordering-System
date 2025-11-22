import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateModal = ({ item, onClose, refreshInventory }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  const categories = ["Crochet", "Knitting", "Yarns", "Patterns", "Tools & Accessories"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      if (form.name.trim() !== "") formData.append("name", form.name.trim());
      if (form.description.trim() !== "") formData.append("description", form.description.trim());
      if (form.price !== "") formData.append("price", parseFloat(form.price));
      if (form.stock !== "") formData.append("stock", parseInt(form.stock));
      if (form.category.trim() !== "") formData.append("category", form.category.trim());
      if (form.imageFile) formData.append("imageFile", form.imageFile);

      const res = await axios.put(
        `http://localhost:5002/api/products/product/${item._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        onClose();
        try {
          await refreshInventory(); // refetch data
        } catch (err) {
          console.error("Failed to refresh inventory:", err);
        }
      } else {
        toast.error(res.data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="bg-[#f5eae8] border border-[#d3ab9e] rounded-2xl p-6 w-full max-w-md relative">
        <h2 className="text-center text-2xl font-bold text-[#A77262] mb-4">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block font-medium text-[#916556] mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder={item.name}
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-[#916556] mb-1">Description</label>
            <textarea
              name="description"
              placeholder={item.description}
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
            />
          </div>

          {/* Price | Stock | Category */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-[#916556] mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder={item.price}
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#916556] mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                placeholder={item.stock}
                value={form.stock}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#916556] mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              >
                <option value="">Current: {item.category}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Existing Images */}
          {item.image && item.image.length > 0 && (
            <div>
              <label className="block font-medium text-[#916556] mb-1">Current Images</label>
              <div className="flex gap-2 mb-2 overflow-x-auto">
                {item.image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`Product ${idx}`}
                    className="h-20 w-20 object-cover rounded-lg border border-[#d3ab9e]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upload New Image */}
          <div>
            <label className="block font-medium text-[#916556] mb-1">Upload New Image</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#d3ab9e] text-[#A77262] hover:bg-[#d3ab9e]/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#d3ab9e] text-white hover:opacity-90"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateModal;