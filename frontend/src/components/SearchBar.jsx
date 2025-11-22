import React, { useState, useEffect } from "react";

const SearchBar = ({ query, setQuery }) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery); // update parent after debounce
    }, 500); // 500ms debounce

    return () => clearTimeout(timer); // clear previous timer
  }, [localQuery, setQuery]);

  return (
    <div className="mb-4 flex items-center gap-2 bg-[#fefeff] p-2 rounded-lg shadow">
      <input
        type="text"
        placeholder="Search items..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg border border-[#d3ab9e] focus:outline-none"
        style={{ backgroundColor: "#fffbff" }}
      />
    </div>
  );
};

export default SearchBar;