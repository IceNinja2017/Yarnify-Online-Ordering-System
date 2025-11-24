import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async (category, query) => {
    console.log(import.meta.env.VITE_PRODUCT_SERVICE_URL);
    console.log(import.meta.env.VITE_PAYMENT_SERVICE_URL);
    console.log(import.meta.env.VITE_AUTH_SERVICE_URL);
    setLoading(true);
    try {
      let endpoint = `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/all-products`;

      if (query.trim()) {
        endpoint = `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/search/${encodeURIComponent(
          query
        )}`;
      } else if (category !== "All") {
        endpoint = `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/category/${encodeURIComponent(
          category
        )}`;
      }

      const res = await axios.get(endpoint);
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // fetch when search query or category changes
  useEffect(() => {
    fetchProducts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex min-h-screen min-w-250 max-w-250 bg-[#fffbff] p-6">
      {/* Sidebar */}
      <aside className="w-64 bg-[#ebd8d0] rounded-xl p-4 mr-6 shadow-md">
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />

        <h2 className="text-xl font-bold text-[#BD8F80] mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className={`cursor-pointer px-3 py-2 rounded-lg transition hover:bg-[#d3ab9e] hover:text-white ${
                category === selectedCategory ? "bg-[#d3ab9e] text-white" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold text-[#BD8F80] mb-6">
          Shop Handicrafts
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
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