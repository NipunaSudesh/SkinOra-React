import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];

    if (currentPage > 3) pages.push(1);
    if (currentPage > 4) pages.push("...");

    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);

    if (currentPage < totalPages - 3) pages.push("...");
    if (currentPage < totalPages - 2) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FaArrowLeft />
      </button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === "..." ? (
              <span className="p-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};