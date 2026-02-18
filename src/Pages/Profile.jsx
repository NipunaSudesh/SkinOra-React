import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [showEdit, setShowEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const avatarUrl = user?.image
    ? user.image
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`;

const fetchOrders = useCallback(async () => {
    if (orders.length > 0) return;

    setLoadingOrders(true);
    setOrdersError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("http://localhost:5000/api/auth/my-orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setMessage("Session expired. Logging out...");
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }, 1800);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setOrdersError("Failed to load orders. Please try again.");
    } finally {
      setLoadingOrders(false);
    }
  }, [orders.length, navigate]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab, fetchOrders]);

  const calculateOrderTotals = (order) => {
    const subtotal = order.items?.reduce((sum, item) => {
      return sum + (item.qty * (item.price || 0));
    }, 0) || 0;

    const itemCount = order.items?.reduce((count, item) => {
      return count + (item.qty || 1);
    }, 0) || 0;

    const shipping = itemCount * 350;
    const grandTotal = order.totalAmount || (subtotal + shipping);

    return { subtotal, shipping, grandTotal };
  };

  const handleLogout = () => {
    setMessage("Logged out successfully ✅");
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }, 1200);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setShowEdit(false);
    setMessage("Profile updated successfully 🎉");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Message */}
        {message && (
          <div className="bg-green-50 text-green-700 p-4 text-center font-medium">
            {message}
          </div>
        )}
        <div>
<h1 className="flex text-3xl text-primary p-4 font-bold">My Account</h1>
        </div>

        {/* Tabs – at the very top */}
        <div className="bg-gray-50 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-white border-b-4 border-primary text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-primary"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-white border-b-4 border-primary text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-primary"
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-32  h-32 rounded-full border-4 border-primary object-cover shadow-md mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 mt-1">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role</span>
                    <span className="font-medium">User</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined</span>
                    <span className="font-medium">
                      {user.createdAt ? new Date(user.createdAt).getFullYear() : "10 Feb 2026"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                <button
                  onClick={() => setShowEdit(true)}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition font-medium w-full"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="border border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-50 transition font-medium w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h3 className="text-xl  text-gray-800 font-bold">My Orders</h3>

              {loadingOrders ? (
                <div className="text-center py-12 text-gray-500 ">Loading orders...</div>
              ) : ordersError ? (
                <div className="text-center py-12 text-red-600 font-medium">{ordersError}</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No orders yet.</div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => {
                    const { subtotal, shipping, grandTotal } = calculateOrderTotals(order);
                    const totalItemQuantity = order.items?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

                    return (
                      <div
                        key={order._id || index}
                        className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow border-primary"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 pb-2 border-b">
                          <div className="flex gap-2 justify-between w-full">
                          <div>
                            <p className="font-bold text-gray-800">
                              Order #{order._id?.slice(-8) || index + 1}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Placed on {new Date(order.placedAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              at {new Date(order.placedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            
                          </div>
<span
  className={`text-xs font-semibold h-8 flex items-center justify-center  px-4 rounded-xl uppercase  ${
    order.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : order.status === "processing"
      ? "bg-blue-100 text-blue-800"
      : order.status === "shipped"
      ? "bg-indigo-100 text-indigo-800"
      : order.status === "delivered"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800"
  }`}
>
  {order.status}
</span>

                          </div>
                         
                        </div>

                        <div className="mb-2">
                          <p className="text-sm  text-gray-900 mb-2 font-semibold">Items</p>
                          <div className="space-y-4">
                            {order.items?.map((item, i) => (
                              <div
                                key={item._id || i}
                                className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">
                                    {item.product?.name || `Product ${i + 1} (name unavailable)`}
                                  </p>
                                  <p className="text-gray-600 mt-1">
                                    Qty: {item.qty} × LKR {item.price?.toLocaleString() || "—"}
                                  </p>
                                </div>
                                <div className="text-right font-medium text-gray-900 whitespace-nowrap">
                                  LKR {(item.qty * (item.price || 0)).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t space-y-2 text-sm">
                          <div className="flex justify-between text-gray-700">
                            <span>Subtotal</span>
                            <span>LKR {subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-gray-700">
                            <span>
                              Shipping Fee (LKR 350 × {totalItemQuantity} item
                              {totalItemQuantity !== 1 ? "s" : ""})
                            </span>
                            <span>LKR {shipping.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-4 border-t font-medium text-base">
                            <span>Total Amount</span>
                            <span className="text-gray-900 text-lg">
                              LKR {grandTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary font-medium transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEdit(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}