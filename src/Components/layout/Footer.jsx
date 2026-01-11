import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import Typography from "../theme/Typography";

export default function Footer() {
  return (
    <footer className="bg-[#02004f] text-white pt-14 pb-8 mt-10">
      <div className="container-card">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo & Social */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 bg-white rounded-md px-3 py-2 w-fit"
            >
              <img src={logo} alt="Skinora Logo" className="h-12 w-auto" />
              <Typography
                variant="h2"
                className="text-lg font-bold text-primary whitespace-nowrap"
              >
                Skin<span className="text-secondary">Ora</span>
              </Typography>
            </Link>

            <div className="flex gap-6 mt-6 text-xl">
              <a href="#" className="hover:text-secondary transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/deliveries" className="hover:text-secondary">Deliveries</Link></li>
              <li><Link to="/faq" className="hover:text-secondary">FAQ</Link></li>
              <li><Link to="/account" className="hover:text-secondary">My Account</Link></li>
              <li><Link to="/track-order" className="hover:text-secondary">Track Order</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-secondary">Shop All</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-secondary">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="hover:text-secondary">Best Sellers</Link></li>
              <li><Link to="/brands" className="hover:text-secondary">Brands</Link></li>
              <li><Link to="/promotions" className="hover:text-secondary">Promotions</Link></li>
            </ul>
          </div>

          {/* About Us (NEW) */}
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-secondary">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-semibold mb-4">Company Info</h4>

            <div className="flex items-start gap-3 text-sm text-gray-300 mb-4">
              <FaMapMarkerAlt className="text-secondary mt-1" />
              <span>Colombo, Sri Lanka</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300 mb-4">
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SkinOra.lk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
