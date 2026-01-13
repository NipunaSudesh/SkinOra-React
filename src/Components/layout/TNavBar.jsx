import React, { useState } from "react";
import {logo} from "../../assets/images";
import TextInput from "../../components/theme/TextInput";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Typography from "../../components/theme/Typography";

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
  { label: "Contact Us", slug: "/contact" },
];

export default function TNavBar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#f2f2cd] z-50">
      <div className="container-card">
        <div className="flex items-center justify-between h-[60px] relative">

{/* Logo + Brand */}
<Link to="/" className="flex items-center shrink-0">
  <img
    src={logo}
    alt="Skinora Logo"
    className="h-10 w-auto"
  />
  <Typography
    variant="h2"
    className="text-lg sm:text-lg font-bold text-primary whitespace-nowrap"
  >
    Skin<span className="text-secondary">Ora</span>
  </Typography>
</Link>


          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex w-full max-w-sm mx-4">
              <TextInput
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full h-9 px-4 border border-gray-300 rounded-l-full focus:outline-none"
              />
              <button className="bg-primary text-white h-9 px-4 rounded-r-full hover:bg-secondary flex items-center justify-center transition">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button
              className="sm:hidden text-gray-700 text-lg hover:text-secondary transition"
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setShowMobileMenu(false);
              }}
            >
              {showMobileSearch ? <FiX /> : <FiSearch />}
            </button>

            <FaShoppingCart className="text-gray-700 hover:text-secondary cursor-pointer text-lg transition" />
            <FaUser className="text-gray-700 hover:text-secondary cursor-pointer text-lg transition" />

            {/* Mobile Menu */}
            <button
              className="lg:hidden text-gray-700 text-xl hover:text-secondary transition"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setShowMobileSearch(false);
              }}
            >
              {showMobileMenu ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/*  Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="absolute left-0 right-0 top-full mt-1 lg:hidden z-50">
              <div className="container-card">
                <div className="flex shadow-lg rounded-full bg-white">
                  <TextInput
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-9 px-4 border border-gray-300 rounded-l-full focus:outline-none"
                    autoFocus
                  />
                  <button className="bg-blue-500 text-white h-9 px-4 rounded-r-full flex items-center justify-center hover:text-secondary ">
                    <FiSearch />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*  Mobile Menu Popup */}
          {showMobileMenu && (
            <div className="absolute left-0 right-0 top-full lg:hidden z-50">
              <div className="container-card">
                <div className="bg-white shadow-lg rounded-lg py-4">
                  <ul className="flex flex-col divide-y">
                    {categories.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setShowMobileMenu(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-secondary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
