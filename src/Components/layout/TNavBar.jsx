import React, { useState } from "react";
import Logo from "../../assets/images/skinora-logo.png";
import TextInput from "../../components/theme/TextInput";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
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

export default function TNavBar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-[#fcf1e6] relative z-50">
      <div className="container-card">
        <div className="flex items-center justify-between h-12 relative">

          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Skinora Logo" className="h-20 w-auto" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex w-full max-w-sm mx-4">
              <TextInput
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full h-9 px-4 border border-gray-300 rounded-l-full focus:outline-none"
              />
              <button className="bg-blue-500 text-white h-9 px-4 rounded-r-full hover:bg-secondary flex items-center justify-center">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button
              className="sm:hidden text-gray-700 text-lg"
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setShowMobileMenu(false);
              }}
            >
              {showMobileSearch ? <FiX /> : <FiSearch />}
            </button>

            <FaShoppingCart className="text-gray-700 hover:text-secondary cursor-pointer text-lg" />
            <FaUser className="text-gray-700 hover:text-secondary cursor-pointer text-lg" />

            {/* Mobile Menu */}
            <button
              className="lg:hidden text-gray-700 text-xl"
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
                  <button className="bg-blue-500 text-white h-9 px-4 rounded-r-full flex items-center justify-center">
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
