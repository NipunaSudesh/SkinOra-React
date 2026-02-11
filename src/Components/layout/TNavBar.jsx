import React, { useState, useEffect, useContext, useCallback } from "react";
import { logo } from "../../assets/images";
import TextInput from "../Theme/TextInput";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../Theme/Typography";
import { CartContext } from "../../context/CartContext";

const categories = [
  { label: "All Products", slug: "/all-products" },
  { label: "Baby Care", slug: "/product-category/baby-care" },
  { label: "Body Care", slug: "/product-category/body-care" },
  { label: "Face Care", slug: "/product-category/face-care" },
  { label: "Hair Care", slug: "/product-category/hair-care" },
  { label: "Sunscreens", slug: "/product-category/sunscreens" },
  { label: "Serums", slug: "/product-category/serums" },
  { label: "Mens Grooming", slug: "/product-category/mens-grooming" },
  { label: "About Us", slug: "/about" },
];

export default function TNavBar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(0);
const { cartItems: cartItemsFromContext } = useContext(CartContext);
  const navigate = useNavigate();

const loadCart = useCallback(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart.length);
  console.log("Cart items loaded:", cart.length); 
}, [setCartItems]);
useEffect(() => {
  loadCart();

  const handleStorage = (e) => {
    if (e.key === "cart") loadCart();
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, [loadCart]);
  // Load cart items from localStorage
  // const loadCart = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCartItems(cart.length);
  //   console.log("Cart items loaded:", cartItems);
  // };
//   const loadCart = useCallback(() => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   setCartItems(cart.length);
//   console.log("Cart items loaded:", cart.length);
//   console.log("Cart items loaded:", cartItems);
// }, []);
// useEffect(() => {
//   loadCart();

//   // Optional: listen for storage events (cart updated in another tab)
//   const handleStorage = (e) => {
//     if (e.key === "cart") loadCart();
//   };

//   window.addEventListener("storage", handleStorage);
//   return () => window.removeEventListener("storage", handleStorage);
// }, [loadCart]); 
  // useEffect(() => {
  //   loadCart();

  //   // Optional: listen for storage events (cart updated in another tab)
  //   const handleStorage = (e) => {
  //     if (e.key === "cart") loadCart();
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  /* CART */
  const handleCart = () => navigate("/cart");

  /* USER */
  const handleUser = () => {
    const user = localStorage.getItem("user");
    navigate(user ? "/profile" : "/login");
  };

  /* SEARCH */
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setShowMobileSearch(false);
    console.log("Cart items from context:", cartItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#f2f2cd] z-50">
      <div className="container-card">
        <div className="flex items-center justify-between h-[60px] relative">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Skinora Logo" className="h-10 w-auto" />
            <Typography variant="h2" className="text-lg font-bold text-primary">
              Skin<span className="text-secondary">Ora</span>
            </Typography>
          </Link>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex w-full max-w-sm mx-4">
              <TextInput
                type="text"
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-9 px-4 border border-gray-300 rounded-l-full"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white h-9 px-4 rounded-r-full hover:bg-secondary"
              >
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 relative">
            <button
              className="sm:hidden text-lg"
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setShowMobileMenu(false);
              }}
            >
              {showMobileSearch ? <FiX /> : <FiSearch />}
            </button>

            {/* Cart Icon with dynamic badge */}
            <div className="relative cursor-pointer" onClick={handleCart}>
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemsFromContext.length}
              </span>
            </div>

            <FaUser onClick={handleUser} className="cursor-pointer" />

            <button
              className="lg:hidden text-xl"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setShowMobileSearch(false);
              }}
            >
              {showMobileMenu ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Search */}
          {showMobileSearch && (
            <div className="absolute left-0 right-0 top-full mt-1 lg:hidden">
              <div className="container-card">
                <div className="flex bg-white rounded-full shadow">
                  <TextInput
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full h-9 px-4 rounded-l-full"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-primary text-white h-9 px-4 rounded-r-full"
                  >
                    <FiSearch />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="absolute left-0 right-0 top-full lg:hidden">
              <div className="container-card">
                <div className="bg-white shadow rounded-lg py-4">
                  <ul className="flex flex-col divide-y">
                    {categories.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={item.slug}
                          onClick={() => setShowMobileMenu(false)}
                          className="block px-4 py-3 hover:text-secondary"
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
    </div>
  );
}
