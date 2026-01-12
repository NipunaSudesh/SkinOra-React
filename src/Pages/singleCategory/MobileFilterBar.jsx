import React from "react";

export default function MobileFilterBar({ filters, setFilters }) {
  const clearAll = () => {
    setFilters({
      category: "",
      brands: [],
      inStock: false,
    });
  };

  const arrowStyle =
    "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjY2IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik03IDEwbDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-right bg-[length:16px] pr-8";

  return (
    <div className="lg:hidden bg-white border rounded-xl p-4 mb-6">
      <div className="flex gap-3 overflow-x-auto items-center">

        {/* Category */}
        <select
          className={`border rounded-lg px-3 py-2 min-w-[160px] ${arrowStyle}`}
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="toiletries">Toiletries</option>
          <option value="body-care">Body Care</option>
          <option value="face-care">Face Care</option>
          <option value="hair-care">Hair Care</option>
          <option value="baby-care">Baby Care</option>
        </select>

        {/* Brand */}
        <select
          className={`border rounded-lg px-3 py-2 min-w-[140px] ${arrowStyle}`}
          value={filters.brands[0] || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              brands: e.target.value ? [e.target.value] : [],
            })
          }
        >
          <option value="">All Brands</option>
          <option value="Cetaphil">Cetaphil</option>
          <option value="Aveeno">Aveeno</option>
          <option value="CeraVe">CeraVe</option>
        </select>

        {/* Availability */}
        <button
          onClick={() =>
            setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
          }
          className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap
            ${filters.inStock ? "bg-primary text-white" : "bg-gray-100"}
          `}
        >
          In Stock
        </button>

        {/* Clear All */}
        <button
          onClick={clearAll}
          className="text-sm hover:underline text-secondary whitespace-nowrap"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
