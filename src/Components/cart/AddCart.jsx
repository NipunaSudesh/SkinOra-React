import React from "react";
import { FaTrash } from "react-icons/fa";

export default function AddCart({
  id,
  imageUrl,
  name,
  price,
  slug,
  oldPrice,
  discountPercent,
  stockStatus,
  category,
  brand,
  qty,
  onQtyChange,
  onRemove,
}) {
  return (
    <div
      key={slug}
      className="flex gap-4 bg-white p-4 rounded-lg shadow"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
          <p className="text-xs text-gray-700">{category} {">"} {brand}</p>
        <div className="flex justify-between">
          <h3 className="font-semibold">{name} (<span className="text-red-500">{discountPercent}% OFF </span>)</h3>
                          {stockStatus && (
                  <span
                    className={`px-3 py-1 rounded-xl text-white text-sm font-medium ${
                      stockStatus === "IN_STOCK"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {stockStatus.toLowerCase().replace("_", " ")}
                  </span>
                )}
        </div>
                  <div className="flex items-end gap-3">
            {oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                Rs. {oldPrice}
              </p>
            )}
            <p className="text-xl font-bold text-primary">
              Rs. {price}
            </p>
          </div>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onQtyChange(slug, qty - 1)}
            className="px-3 py-1 border rounded"
            disabled={qty <= 1}
          >
            −
          </button>

          <span>{qty}</span>

          <button
            onClick={() => onQtyChange(slug, qty + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>

          <button
            onClick={() => onRemove(slug)}
            className="ml-auto text-red-500"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
