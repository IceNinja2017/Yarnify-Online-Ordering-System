import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [categories] = useState([
    "All",
    "Crochet",
    "Knitting",
    "Yarns",
    "Patterns",
    "Tools & Accessories",
  ]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get("category") || "All";

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      let endpoint = "http://localhost:5002/api/products/all-products";
      if (category && category !== "All") {
        endpoint = `http://localhost:5002/api/products/category/${encodeURIComponent(category)}`;
      }

      const res = await axios.get(endpoint);
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(categoryParam);
  }, [categoryParam]);

  const handleCategoryClick = (category) => {
    setSearchParams({ category });
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="flex min-h-screen min-w-250 max-w-250 bg-[#fffbff] p-6">
      {/* Categories Sidebar */}
      <aside className="w-64 bg-[#ebd8d0] rounded-xl p-4 mr-6 shadow-md">
        <h2 className="text-xl font-bold text-[#BD8F80] mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className={`cursor-pointer px-3 py-2 rounded-lg transition hover:bg-[#d3ab9e] hover:text-white ${
                category === categoryParam ? "bg-[#d3ab9e] text-white" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Grid */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold text-[#BD8F80] mb-6">Shop Handicrafts</h1>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default ShopPage;
