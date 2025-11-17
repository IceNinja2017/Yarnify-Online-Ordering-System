// src/pages/Shop.jsx
import { useState } from "react";

const ShopPage = () => {
  const [categories] = useState([
    "All",
    "Crochet",
    "Knitting",
    "Yarn",
    "Patterns",
    "Tools & Accessories",
  ]);

  const [products] = useState([
    { id: 1, name: "Crochet Hat", price: "$20", image: "https://placehold.co/150x150?text=Crochet+Hat" },
    { id: 2, name: "Knitting Scarf", price: "$35", image: "https://placehold.co/150x150?text=Knitting+Scarf" },
    { id: 3, name: "Wool Yarn Pack", price: "$15", image: "https://placehold.co/150x150?text=Yarn+Pack" },
    { id: 4, name: "Crochet Amigurumi", price: "$25", image: "https://placehold.co/150x150?text=Amigurumi" },
    { id: 5, name: "Knitting Needles", price: "$10", image: "https://placehold.co/150x150?text=Knitting+Needles" },
    { id: 6, name: "Pattern Book", price: "$18", image: "https://placehold.co/150x150?text=Pattern+Book" },
  ]);

  return (
    <div className="flex min-h-screen bg-[#fffbff] p-6">
      {/* Categories Sidebar */}
      <aside className="w-64 bg-[#ebd8d0] rounded-xl p-4 mr-6 shadow-md">
        <h2 className="text-xl font-bold text-[#BD8F80] mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className="cursor-pointer px-3 py-2 rounded-lg hover:bg-[#d3ab9e] hover:text-white transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Grid */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold text-[#BD8F80] mb-6">Shop Handicrafts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-[#ebd8d0] p-4 rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-[#BD8F80] font-bold text-lg">{product.name}</h2>
              <p className="text-[#916556] mt-1">{product.price}</p>
              <button className="mt-3 w-full bg-[#d3ab9e] text-white py-2 rounded-xl hover:bg-[#BD8F80] transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
