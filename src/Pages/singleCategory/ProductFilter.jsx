import React from "react";

/* STATIC CATEGORIES */
const CATEGORIES = [
  { name: "Toiletries", slug: "toiletries" },
  { name: "Body Care", slug: "body-care" },
  { name: "Wellness Bundles", slug: "wellness-bundles" },
  { name: "Sunscreens", slug: "sunscreens" },
  { name: "Face Care", slug: "face-care" },
  { name: "Hair Care", slug: "hair-care" },
  { name: "Baby Care", slug: "baby-care" },
];

const BRANDS = [
  "Aveeno",
  "Bioderma",
  "CeraVe",
  "Cetaphil",
  "Ego QV",
  "La Roche Posay",
  "Neutrogena",
];

export default function ProductFilter({ filters, setFilters }) {
  const toggleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const clearAll = () => {
    setFilters({
      category: "",
      brands: [],
      inStock: false,
    });
  };

  return (
    <aside className="hidden lg:block bg-gray-100 border rounded-xl p-5 ">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-semibold text-primary">Filters</h3>
        <button
          onClick={clearAll}
          className="text-sm text-secondary hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Categories </h4>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Brands</h4>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-semibold mb-3">Availability</h4>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.checked })
            }
          />
          In Stock
        </label>
      </div>
    </aside>
  );
}
