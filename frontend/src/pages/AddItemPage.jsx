import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const categories = ["Crochet", "Knitting", "Yarns", "Patterns", "Tools & Accessories"];

const AddItemPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);

      image.forEach((file) => formData.append("image", file));

      await axios.post(
        "http://localhost:5002/api/products/product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      toast.success("Product added successfully!");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory(categories[0]);
      setStock("");
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full 
                 bg-[#f5eae8]/80 backdrop-blur-2xl 
                 rounded-2xl shadow-2xl overflow-hidden 
                 border border-[#d3ab9e]/20 m-10"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center 
                     bg-linear-to-r from-[#A77262] via-[#BD8F80] to-[#D3AB9E] 
                     text-transparent bg-clip-text"
        >
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[#916556]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#916556]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#916556]">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#916556]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#916556]">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#916556]">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 rounded-lg border border-[#d3ab9e]"
            />
            {image.length > 0 && (
              <p className="mt-1 text-sm text-[#916556]">{image.length} file(s) selected</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="mt-5 w-full py-3 px-4 bg-linear-to-r from-[#ebbdae] to-[#D3AB9E] text-white 
                       font-bold rounded-lg shadow-lg hover:from-[#A77262] hover:to-[#795d54] 
                       focus:outline-none focus:ring-2 focus:ring-[#A77262] focus:ring-offset-2
                       focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Adding..." : "Add Product"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddItemPage;