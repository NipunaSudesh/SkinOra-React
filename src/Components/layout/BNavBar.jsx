import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { label: "All Categories", path: "/categories" },
  { label: "Baby Products", path: "/baby-products" },
  { label: "Body Care", path: "/body-care" },
  { label: "Face Care", path: "/face-care" },
  { label: "Hair Care", path: "/hair-care" },
  { label: "Sunscreens", path: "/sunscreens" },
  { label: "Toiletries", path: "/toiletries" },
  { label: "Wellness Bundles", path: "/wellness-bundles" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

export default function BNavBar() {
  return (
    <nav className="hidden lg:block fixed top-10 left-0 right-0 bg-primary border-t border-gray-200 z-40">
      <div className="container-card py-3 mt-2">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base justify-center items-center">
          {categories.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-white hover:text-secondary transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
