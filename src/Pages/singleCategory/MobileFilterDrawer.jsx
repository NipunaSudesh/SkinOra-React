
import React from "react";
import { X } from "lucide-react";
const CATEGORIES = [
  { name: "Baby Care",       slug: "baby-care"       },
  { name: "Body Care",       slug: "body-care"       },
  { name: "Face Care",       slug: "face-care"       },
  { name: "Hair Care",       slug: "hair-care"       },
  { name: "Sunscreens",      slug: "sunscreens"      },
  { name: "Serums",          slug: "serums"          },
  { name: "Men's Grooming",  slug: "mens-grooming"   },
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

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
   hideCategory = false,
}) {
  if (!isOpen) return null;

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
      country: "",
      brands: [],
      inStock: false,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 p-5 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary">Filters</h3>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Categories */}
{!hideCategory && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Categories</h4>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={filters.category}
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
          <h4 className="font-semibold mb-2">Brands</h4>
          <div className="space-y-2">
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
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Availability</h4>
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

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={clearAll}
            className="flex-1 border rounded-lg py-2 text-sm"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-primary text-white rounded-lg py-2 text-sm"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
