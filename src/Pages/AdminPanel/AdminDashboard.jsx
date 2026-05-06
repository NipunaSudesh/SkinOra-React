import AdminLayout from "./AdminLayout";

/* ---------------- DATA ---------------- */

const users = [
  { name: "Marco Rossi", role: "Editor", status: "Active", joined: "May 1" },
  { name: "Priya Nair", role: "Viewer", status: "Pending", joined: "Apr 29" },
  { name: "James Obi", role: "Admin", status: "Active", joined: "Apr 27" },
  { name: "Lena Vogel", role: "Editor", status: "Inactive", joined: "Apr 22" },
];

const activities = [
  { bg: "bg-indigo-50", icon: "👤", label: "New user registered", sub: "2 min ago · sara@email.com" },
  { bg: "bg-emerald-50", icon: "✓", label: "Order #4821 fulfilled", sub: "18 min ago · $340.00" },
  { bg: "bg-amber-50", icon: "⚠", label: "Payment failed", sub: "45 min ago · Invoice #221" },
  { bg: "bg-indigo-50", icon: "★", label: "New 5-star review", sub: "1 hr ago · Product SKU-998" },
];

const metrics = [
  { label: "Total Revenue", value: "$84,230", delta: "+12.4% vs last month", up: true,  icon: "💰" },
  { label: "Active Users",  value: "3,841",   delta: "+8.1% vs last month",  up: true,  icon: "👥" },
  { label: "New Orders",    value: "526",      delta: "-3.2% vs last month",  up: false, icon: "🛍" },
  { label: "Conversion",    value: "4.6%",     delta: "+0.9% vs last month",  up: true,  icon: "📝" },
];

const statusClasses = {
  Active:   "bg-green-100 text-green-800",
  Pending:  "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
};

/* ---------------- MAIN ---------------- */

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#f5f4f0]  flex flex-col gap-4">

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-black/[0.06] p-5">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-gray-400">{m.label}</span>
                <span className="text-xl">{m.icon}</span>
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1.5">{m.value}</div>
              <div className={`text-xs flex items-center gap-1 ${m.up ? "text-green-700" : "text-red-600"}`}>
                <span>{m.up ? "▲" : "▼"}</span>
                {m.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity + Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
              <span className="text-sm text-indigo-600 hover:underline cursor-pointer">View all</span>
            </div>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shadow-sm ${a.bg}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{a.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-gray-900">Recent Users</h2>
              <span className="text-sm text-indigo-600 hover:underline cursor-pointer">Export</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    {["Name", "Role", "Status", "Joined"].map((h) => (
                      <th key={h} className="pb-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.name} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="py-3 text-gray-500">{u.role}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[u.status]}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
