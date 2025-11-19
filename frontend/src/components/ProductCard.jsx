import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleViewItem = () => {
    navigate(`/item/${product._id}`);
  };

  const handleMouseEnter = () => {
    controls.start({
      x: "-100%",
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  const handleMouseLeave = () => {
    controls.stop();
    controls.set({ x: 0 });
  };

  return (
    <div className="border rounded-md shadow-md p-4 flex flex-col justify-between group overflow-hidden">
      <div>
        <img
          src={product.image?.[0]?.url || "https://placehold.co/150x150?text=No+Image"}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />

        {/* Product Name with Framer Motion */}
        <div
          className="relative w-full h-6 overflow-hidden font-bold"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            animate={controls}
            className="whitespace-nowrap"
          >
            {product.name}
          </motion.div>
        </div>

        {product.category && <p className="text-gray-600 text-sm mb-2">{product.category}</p>}
        <p className="text-xl font-bold text-green-600">₱{product.price}</p>
      </div>

      <button
        className="mt-3 w-full bg-[#A77262] text-white py-2 rounded-md hover:bg-[#D3AB9E]"
        onClick={handleViewItem}
      >
        View Item
      </button>
    </div>
  );
};

export default ProductCard;