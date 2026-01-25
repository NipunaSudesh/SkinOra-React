
import React from "react";

/* STATIC DATA */
const CATEGORIES = [
  { name: "Baby Care",       slug: "baby-care"       },
  { name: "Body Care",       slug: "body-care"       },
  { name: "Face Care",       slug: "face-care"       },
  { name: "Hair Care",       slug: "hair-care"       },
  { name: "Sunscreens",      slug: "sunscreens"      },
  { name: "Serums",          slug: "serums"          },
  { name: "Men's Grooming",  slug: "mens-grooming"   },
];

const BRANDS = [
  "L'Oréal Men Expert",
  "Gillette",
  "Nivea",
  "Dove",
  "CeraVe",
  "Cetaphil",
  "Garnier",
  "OGX",
  "Old Spice",
  "Brut",
];
const COUNTRIES = [
  { name: "Australia",       code: "AU" },
  { name: "Canada",          code: "CA" },
  { name: "France",          code: "FR" },
  { name: "Germany",         code: "DE" },
  { name: "Japan",           code: "JP" },
  { name: "Singapore",       code: "SG" },
  { name: "South Korea",     code: "KR" },
  { name: "Sri Lanka",       code: "LK" },
  { name: "United Kingdom",  code: "UK" },
  { name: "United States",   code: "US" },
];

export default function ProductFilter({
  filters,
  setFilters,
  hideCategory = false,
}) {
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
      brands: [],
      country: [],
      inStock: false,
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <aside className="bg-gray-100 border rounded-xl p-5">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold text-primary">Filters</h3>
        <button
          onClick={clearAll}
          className="text-sm text-secondary hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories (hidden in CategoryProduct) */}
      {!hideCategory && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Categories</h4>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filters.category || ""}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
<div className="mb-6">
  <h4 className="font-semibold mb-3">Country</h4>
  <select
    className="w-full border rounded-lg px-3 py-2"
    value={filters.country || ""}
    onChange={(e) =>
      setFilters({ ...filters, country: e.target.value })
    }
  >
    <option value="">All Countries</option>
    {COUNTRIES.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
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
