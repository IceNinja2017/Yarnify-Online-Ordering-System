import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewItem = () => {
    navigate(`/item/${product._id}`);
  };

  return (
    <div className="border rounded-md shadow-md p-4 flex flex-col justify-between">
      <div>
        <img
          src={product.image?.[0]?.url || "https://placehold.co/150x150?text=No+Image"}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h2 className="font-semibold text-lg">{product.name}</h2>
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
