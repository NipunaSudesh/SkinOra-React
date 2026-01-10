import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ img, category, description, slug }) {
  return (
    <Link to={`/category/${slug}`} className="group w-60">
      <div className="relative flex flex-col items-center cursor-pointer">

        {/* Image Container */}
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          <img
            src={img}
            alt={category}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center
                          bg-black/50 opacity-0 group-hover:opacity-100
                          transition-opacity duration-300">
            <p className="text-sm text-gray-200 p-4 text-center ">
              {description}
            </p>
          </div>
        </div>

        {/* Title */}
        <h4 className="mt-3 font-bold text-primary transition-colors duration-300 group-hover:text-secondary">
          {category}
        </h4>

      </div>
    </Link>
  );
}
