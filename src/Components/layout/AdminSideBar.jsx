import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getUserFromToken } from "../../utils/auth";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaThList,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt, color: "#2563eb" },
  { name: "Users Management", path: "/admin/users-management", icon: FaUsers, color: "#16a34a" },
  { name: "Products Management", path: "/admin/products-management", icon: FaBoxOpen, color: "#9333ea" },
  { name: "Orders Management", path: "/admin/orders-management", icon: FaShoppingCart, color: "#dc2626" },
  { name: "Categories Management", path: "/admin/categories-management", icon: FaThList, color: "#d97706" },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedUser = getUserFromToken();
    setUser(decodedUser);

  }, []);
      console.log("Decoded User:", user);
  return (
    <>
      {/* ==================== MOBILE TOP BAR ==================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-white border-b shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ==================== SIDEBAR ==================== */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-10
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static  md:shadow-xl
        `}
      >
        {/* Header - Desktop only */}
        <div className="hidden md:block px-6 py-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Control Center
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2 ">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isHovered = hovered === item.name;

            return (
             <div >
                 <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}           // Close sidebar on mobile after click
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  group flex  items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300
                  ${isActive ? "font-semibold" : "font-medium"}
                `}
                style={{
                  backgroundColor: isActive
                    ? `${item.color}15`
                    : isHovered
                    ? `${item.color}08`     // Very soft hover
                    : "transparent",
                }}
              >
                {/* Icon */}
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-2xl flex-shrink-0 transition-all duration-300 "
                  style={{
                    backgroundColor: isActive || isHovered ? item.color : "#f3f4f6",
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isActive || isHovered ? "#ffffff" : "#6b7280",
                    }}
                  />
                </span>

                {/* Label */}
                <span
                  className="text-[15px] transition-colors"
                  style={{
                    color: isActive || isHovered ? item.color : "#374151",
                  }}
                >
                  {item.name}
                </span>

                {/* Active Dot */}
                {isActive && (
                  <span
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
             </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-gray-50 transition">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base">
             {user?.name
              ?.split(" ")
              .map(word => word.charAt(0))
              .join("")
              .toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user ? user.name : "User"}</p>
              <p className="text-xs text-gray-500">{user ? user.role : ""}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE OVERLAY ==================== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;