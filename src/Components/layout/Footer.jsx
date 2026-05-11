import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import { FaFacebookF, FaInstagram, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt,} from "react-icons/fa";
import Typography from "../Theme/Typography";

export default function Footer() {
  return (
    <footer className="bg-[#02004f] text-white pt-16 pb-8 mt-10">
      <div className="container-card">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* LOGO */}
          <div className="flex flex-col items-center lg:items-start">
            <Link
              to="/"
              className="flex items-center bg-white rounded-md py-2 w-[200px] "
            >
              <img src={logo} alt="Skinora Logo" className="h-12" />
              <Typography
                variant="h2"
                className="text-lg font-bold text-primary"
              >
                Skin<span className="text-secondary">Ora</span>
              </Typography>
            </Link>

            <div className="flex gap-5 mt-6 text-xl">
              <FaFacebookF className="hover:text-secondary cursor-pointer" />
              <FaInstagram className="hover:text-secondary cursor-pointer" />
              <FaTiktok className="hover:text-secondary cursor-pointer" />
            </div>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="#">Deliveries</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="#">Track Order</Link></li>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/all-products">Shop All</Link></li>
              <li><Link to="/all-products">New Arrivals</Link></li>
              <li><Link to="/all-products">Best Sellers</Link></li>
              <li><Link to="/all-categories">Brands</Link></li>
              <li><Link to="/all-categories">Categories</Link></li>
         
            </ul>
          </div>

          {/* ABOUT US */}
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* COMPANY INFO */}
          <div>
            <h4 className="font-semibold mb-4">Company Info</h4>

            <div className="flex items-start gap-3 text-sm text-gray-300 mb-3">
              <FaMapMarkerAlt className="text-secondary mt-1" />
              <span>Colombo, Sri Lanka</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300 mb-3">
              <FaEnvelope className="text-secondary mt-1" />
              <span>info@skinora.lk</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <FaPhoneAlt className="text-secondary mt-1" />
              <div>
                <p>076 652 1815</p>
                <p className="text-xs text-gray-400">(8am – 8pm Daily)</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SkinOra.lk. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
