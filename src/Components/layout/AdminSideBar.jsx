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
  // { name: "Categories Management", path: "/admin/categories-management", icon: FaThList, color: "#d97706" },
];

const AdminSidebar = ({ open, setOpen }) => {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  // ✅ CLOSE ON ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ✅ CLOSE ON ESC KEY
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>



      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40
          flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* CLOSE BUTTON (MOBILE ONLY) */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* HEADER */}
        <div className="px-6 py-6 border-b border-gray-100 flex justify-between">
<div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Control Center
          </p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            Admin Panel
          </h2>
</div>
          <X size={28} className="text-gray-400 md:hidden mt-4" onClick={() => setOpen(false)}/>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isHovered = hovered === item.name;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl transition"
                style={{
                  backgroundColor: isActive
                    ? `${item.color}15`
                    : isHovered
                    ? `${item.color}08`
                    : "transparent",
                }}
              >
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: isActive || isHovered ? item.color : "#f3f4f6",
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isActive || isHovered ? "#fff" : "#6b7280",
                    }}
                  />
                </span>

                <span
                  className="text-[15px]"
                  style={{
                    color: isActive || isHovered ? item.color : "#374151",
                  }}
                >
                  {item.name}
                </span>

                {isActive && (
                  <span
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-6 py-5 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {user?.name
                ?.split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;