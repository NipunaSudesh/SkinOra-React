import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaShoppingBag, FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";
import { Pagination } from "../../Components/Theme/Pagination";
import AdminLayout from "./AdminLayout";
import { Menu } from "lucide-react";

const STATUS_STYLES = {
  pending:   { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
  paid:      { bg: "bg-blue-100",   text: "text-blue-700",   label: "Paid" },
  shipped:   { bg: "bg-purple-100", text: "text-purple-700", label: "Shipped" },
  delivered: { bg: "bg-green-100",  text: "text-green-700",  label: "Delivered" },
  cancelled: { bg: "bg-red-100",    text: "text-red-700",    label: "Cancelled" },
};

export const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, shipping: 0, completed: 0 });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const itemsPerPage = 15;
  const API_URL = process.env.REACT_APP_SKINORA_API_URL;

  // ================= FETCH =================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // ================= UPDATE STATUS =================
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update locally so UI reflects instantly
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
      // refresh stats from server
      fetchOrders();
    } catch (err) {
      console.error("Update status error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/admin/orders/${orderToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleteOpen(false);
      setOrderToDelete(null);
      fetchOrders();
    } catch (err) {
      console.error("Delete order error:", err);
    }
  };

  // ================= FILTER =================
  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const name  = `${o.shippingInfo?.firstName || ""} ${o.shippingInfo?.lastName || ""}`.toLowerCase();
    const email = o.shippingInfo?.email?.toLowerCase() || "";
    const id    = o._id?.toLowerCase();
    const q     = search.toLowerCase();
    const matchSearch = !q || name.includes(q) || email.includes(q) || id.includes(q);
    return matchStatus && matchSearch;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const statCards = [
    { title: "Total Orders", value: stats.total,     icon: FaShoppingBag, bg: "bg-blue-100",   iconColor: "text-blue-600" },
    { title: "Pending",      value: stats.pending,   icon: FaClock,       bg: "bg-yellow-100", iconColor: "text-yellow-600" },
    { title: "Shipped",      value: stats.shipped,   icon: FaTruck,       bg: "bg-purple-100", iconColor: "text-purple-600" },
    { title: "Delivered",    value: stats.delivered, icon: FaCheckCircle, bg: "bg-green-100",  iconColor: "text-green-600" },
  ];

  return (
    <AdminLayout open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6 bg-[#f5f4f0] min-h-screen flex flex-col gap-6">

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button onClick={() => setOpen(true)} className="bg-white shadow-lg border w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition">
            <Menu size={22} />
          </button>
        </div>

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-primary">Order Management</h1>
          <p className="text-sm text-gray-500">Track and manage all customer orders</p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-500 text-sm">{stat.title}</h2>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={`text-3xl ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-primary">All Orders</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">No orders found</td>
                </tr>
              ) : (
                paginated.map((order, index) => {
                  const style = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
                  const fullName = `${order.shippingInfo?.firstName || ""} ${order.shippingInfo?.lastName || ""}`.trim();
                  return (
                    <tr key={order._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 text-gray-500">{(page - 1) * itemsPerPage + index + 1}</td>

                      <td className="p-3 font-mono text-xs text-gray-500">
                        #{order._id?.slice(-8).toUpperCase()}
                      </td>

                      <td className="p-3">
                        <p className="font-medium">{fullName || "—"}</p>
                        <p className="text-xs text-gray-400">{order.shippingInfo?.email || ""}</p>
                      </td>

                      <td className="p-3 text-gray-500">{order.shippingInfo?.phone || "—"}</td>

                      <td className="p-3 font-semibold">Rs. {order.totalAmount?.toLocaleString()}</td>

                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>

                      <td className="p-3">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${style.bg} ${style.text} ${updatingId === order._id ? "opacity-50 cursor-wait" : ""}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => { setSelectedOrder(order); setIsViewOpen(true); }}
                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => { setOrderToDelete(order); setIsDeleteOpen(true); }}
                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filtered.length / itemsPerPage)}
            onPageChange={setPage}
          />
        </div>

        {/* ================= VIEW MODAL ================= */}
        {isViewOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[640px] max-h-[90vh] overflow-y-auto shadow-lg">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-primary">Order Details</h2>
                <button onClick={() => setIsViewOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
              </div>

              {/* ORDER META */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Order ID",  value: `#${selectedOrder._id?.slice(-8).toUpperCase()}` },
                  { label: "Date",      value: new Date(selectedOrder.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
                  { label: "Total",     value: `Rs. ${selectedOrder.totalAmount?.toLocaleString()}` },
                  { label: "Status",    value: (
                    <span className={`px-2 py-1 text-xs rounded font-medium ${STATUS_STYLES[selectedOrder.status]?.bg} ${STATUS_STYLES[selectedOrder.status]?.text}`}>
                      {STATUS_STYLES[selectedOrder.status]?.label}
                    </span>
                  )},
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <div className="text-sm font-medium text-gray-800">{value}</div>
                  </div>
                ))}
              </div>

              {/* SHIPPING INFO */}
              {selectedOrder.shippingInfo && (
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Customer & Shipping Info</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-2 text-sm">
                    {[
                      { label: "Name",    value: `${selectedOrder.shippingInfo.firstName} ${selectedOrder.shippingInfo.lastName}` },
                      { label: "Phone",   value: selectedOrder.shippingInfo.phone },
                      { label: "Email",   value: selectedOrder.shippingInfo.email },
                      { label: "Address", value: selectedOrder.shippingInfo.address },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-gray-400">{label}</p>
                        <p className="font-medium text-gray-700">{value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ORDER ITEMS */}
              {selectedOrder.items?.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Items ({selectedOrder.items.length})</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Product</th>
                          <th className="p-2 text-center">Qty</th>
                          <th className="p-2 text-right">Price</th>
                          <th className="p-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                {item.product?.imageUrl && (
                                  <img src={item.product.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />
                                )}
                                <span>{item.product?.name || item.name || "—"}</span>
                              </div>
                            </td>
                            <td className="p-2 text-center">{item.qty || item.quantity || 1}</td>
                            <td className="p-2 text-right">Rs. {item.price?.toLocaleString()}</td>
                            <td className="p-2 text-right font-medium">
                              Rs. {((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={3} className="p-2 text-right font-semibold text-gray-700">Total</td>
                          <td className="p-2 text-right font-bold text-primary">
                            Rs. {selectedOrder.totalAmount?.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* UPDATE STATUS */}
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h3>
                <div className="flex gap-2 flex-wrap">
                  {["pending", "paid", "shipped", "delivered", "cancelled"].map((s) => {
                    const st = STATUS_STYLES[s];
                    const isActive = selectedOrder.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selectedOrder._id, s)}
                        disabled={updatingId === selectedOrder._id}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                          isActive
                            ? `${st.bg} ${st.text} border-transparent`
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        } ${updatingId === selectedOrder._id ? "opacity-50 cursor-wait" : ""}`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => setIsViewOpen(false)} className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE MODAL ================= */}
        {isDeleteOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h2 className="text-lg font-bold mb-3">Delete Order</h2>
              <p className="text-gray-600 text-sm">
                Are you sure you want to delete order{" "}
                <span className="font-semibold">#{orderToDelete?._id?.slice(-8).toUpperCase()}</span>?
                This cannot be undone.
              </p>
              <div className="flex justify-end gap-2 mt-5">
                <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};