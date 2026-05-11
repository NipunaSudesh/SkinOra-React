import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";


const userClasses = {
  user:   "bg-green-200 text-green-900",
  admin:  "bg-yellow-300 text-gray-700",
  superadmin: "bg-red-200 text-gray-100",
};

export default function AdminDashboard() {
const [dashboardData, setDashboardData] = useState(null);
const API_URL = process.env.REACT_APP_SKINORA_API_URL;
const [open, setOpen] = useState(false);

const groupedActivities = Object.values(
  (dashboardData?.data?.activities || []).reduce((acc, activity) => {
    const key = activity.label;

    if (!acc[key]) {
      acc[key] = {
        ...activity,
        count: 1,
      };
    } else {
      acc[key].count += 1;
    }

    return acc;
  }, {})
);
const metrics = [
  {
    label: "Total Revenue",
    value: `Rs ${dashboardData?.data?.totalRevenue}.00`,
    delta: "Revenue",
    up: true,
    icon: "💰",
  },
  {
    label: "Total Users",
    value: dashboardData?.data?.totalUsers,
    delta: "Users",
    up: true,
    icon: "👥",
  },
  {
    label: "Categories",
    value: dashboardData?.data?.totalCategories,
    delta: "Categories",
    up: true,
    icon: "📂",
  },
  {
    label: "Total Products",
    value: dashboardData?.data?.totalProducts,
    delta: "Products",
    up: true,
    icon: "📦",
  },
  {
    label: "Pending Orders",
    value: dashboardData?.data?.pendingOrders,
    delta: "Pending",
    up: false,
    icon: "⏳",
  },
  {
    label: "Completed Orders",
    value: dashboardData?.data?.completedOrders,
    delta: "Completed",
    up: true,
    icon: "✅",
  },
];
const fetchDashBoardData =async ()=>{
  try {
            const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${API_URL}/api/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboardData(data);
        console.log("Dashboard Data:", data);
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  fetchDashBoardData();
},[])

  return (
    <AdminLayout open={open} setOpen={setOpen}>
      <div className=" bg-[#f5f4f0]  flex flex-col gap-4">
<div className=" md:hidden">
  <button
    onClick={() => setOpen(true)}
    className="bg-white shadow-lg border w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition"
  >
    <Menu size={22} />
  </button>
</div>
<div>
  <h1 className="text-2xl font-bold text-primary">
    Dashboard Overview
  </h1>

  <p className="text-sm text-gray-500">
    Monitor users, orders, products and system activity
  </p>
</div>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
              <h2 className="text-base font-semibold text-primary">Recent Activity</h2>
              {/* <span className="text-sm text-indigo-600 hover:underline cursor-pointer">View all</span> */}
            </div>
            <div className="space-y-4">
              {groupedActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shadow-sm ${a.bg}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {a.label}

                      {a.count > 1 && (
                        <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {a.count}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-primary">Recent Users</h2>
              {/* <span className="text-sm text-indigo-600 hover:underline cursor-pointer">Export</span> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-900 border-b border-gray-100">
                    {["Name", "Role",  "Joined"].map((h) => (
                      <th key={h} className="pb-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.data?.recentUsers?.map((u) => (
                    <tr key={u.name} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-600">{u.name}</td>
    

               <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${userClasses[u.role]}`}>
                          {u.role}
                        </span>
                      </td>

            <td className="py-3 text-gray-600">
        {new Date(u.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })}
      </td>
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
