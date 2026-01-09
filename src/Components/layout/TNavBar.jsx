import React, { useState } from "react";
import Logo from "../../assets/images/skinora-logo.png";
import TextInput from "../../components/theme/TextInput";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function TNavBar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-[#fcf1e6] relative z-50">
      <div className="container-card">
        <div className="flex items-center justify-between h-12 relative">

          {/* Logo */}
          <a href="/">
            <img src={Logo} alt="Skinora Logo" className="h-20 w-auto" />
          </a>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center ">
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
            {/* Mobile Search Toggle */}
            <button
              className="sm:hidden text-gray-700 text-lg"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              {showMobileSearch ? <FiX /> : <FiSearch />}
            </button>

            <FaShoppingCart className="text-gray-700 hover:text-secondary cursor-pointer text-lg" />
            <FaUser className="text-gray-700 hover:text-secondary cursor-pointer text-lg" />

            <button className="md:hidden text-gray-700 text-xl">
              <FiMenu />
            </button>
          </div>

          {/* 🔍 Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="absolute left-0 right-0 top-full mt-1 sm:hidden z-50">
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

        </div>
      </div>
    </header>
  );
}
