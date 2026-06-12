  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth";

  const categories = [
      { label: "All Products", slug: "all-products" },
    { label: "Baby Care", slug: "product-category/baby-care" },
    { label: "Body Care", slug: "product-category/body-care" },
    { label: "Face Care", slug: "product-category/face-care" },
    { label: "Hair Care", slug: "product-category/hair-care" },
    { label: "Sunscreens", slug: "product-category/sunscreens" },
    { label: "Serums", slug: "product-category/serums" },
    { label: "Mens Grooming", slug: "product-category/mens-grooming" },
    { label: "About Us", slug: "/about" },
    // { label: "Admin Panal", slug: "/admin" },
    // { label: "Contact Us", slug: "/contact" },
  ];

  export default function BNavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedUser = getUserFromToken();
    setUser(decodedUser);
  }, []);

    return (
      <nav className="hidden lg:block fixed top-14 left-0 right-0 bg-primary border-t border-gray-200 z-50">
        <div className="container-card py-3 mt-2 ">
          <div className="flex flex-wrap gap-x-4 ap-y-2 text-base justify-center items-center">
            {categories.map((item) => (
              <Link
                key={item.label}
                to={item.slug}
                className="text-white hover:text-secondary transition"
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "admin" || user?.role === "superadmin" && (
                         <Link
              to="/admin/dashboard"
              className="text-white hover:text-secondary transition"
            >
              Admin Panel
            </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
