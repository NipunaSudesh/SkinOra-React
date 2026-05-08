import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Menu } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  FaUsers,
  FaUser,
  FaUserShield,
  FaCrown,
} from "react-icons/fa";

const userStats = [
  {
    title: "Total Users",
    value: "1,284",
    color: "text-green-600",
    icon: FaUsers,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Users",
    value: "1,091",
    color: "text-blue-600",
    icon: FaUser,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Admins",
    value: "80",
    color: "text-purple-600",
    icon: FaUserShield,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Super Admins",
    value: "10",
    color: "text-red-600",
    icon: FaCrown,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

const users = [
  {
    id: 1,
    user: "Nipuna Sudesh",
    email: "nipuna@gmail.com",
    role: "Super Admin",
    status: "Active",
    joined: "2026-05-01",
  },
  {
    id: 2,
    user: "Kasun Perera",
    email: "kasun@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "2026-04-20",
  },
  {
    id: 3,
    user: "Sahan Silva",
    email: "sahan@gmail.com",
    role: "User",
    status: "Blocked",
    joined: "2026-03-15",
  },
  {
    id: 4,
    user: "Dilshan Fernando",
    email: "dilshan@gmail.com",
    role: "User",
    status: "Pending",
    joined: "2026-02-10",
  },
];

export const UserManagement = () => {
  const [open, setOpen] = useState(false);

  return (
    <AdminLayout open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6 bg-[#f5f4f0] min-h-screen flex flex-col gap-6">

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="bg-white shadow-lg border w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Users Management
          </h1>

          <p className="text-sm text-gray-500">
            Manage users, admins and permissions
          </p>
        </div>

        {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {userStats.map((stat, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-5 shadow-sm border"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-500">{stat.title}</h2>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>

        <div className={`${stat.bg} p-3 rounded-xl`}>
          <stat.icon className={`text-3xl ${stat.iconColor}`} />
        </div>
      </div>
    </div>
  ))}
</div>

<div className="flex flex-col gap-3">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">All Users</h2>

    <input
      type="text"
      placeholder="Search users..."
      className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
    <table className="min-w-full text-sm">

      {/* Head */}
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-6 text-left">#</th>
          <th className="py-3 px-6 text-left">User</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Role</th>
          <th className="py-3 px-6 text-left">Joined</th>
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-100">
        {users.filter(user => user.role === "User")
        .map((user, index) => (
          <tr
            key={user.id}
            className="hover:bg-gray-50 transition"
          >
            <td className="py-3 px-6 text-gray-500">{index + 1}</td>

            <td className="py-3 px-6 font-medium text-gray-800">
              {user.user}
            </td>

            <td className="py-3 px-6 text-gray-600">
              {user.email}
            </td>

            <td className="py-3 px-6">
              <span
                className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600"
              >
                {user.role}
              </span>
            </td>

            <td className="py-3 px-6 text-gray-600">
              {user.joined}
            </td>

            <td className="py-3 px-6 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* Edit */}
    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
      <FaEdit />
    </button>

    {/* Delete */}
    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
      <FaTrash />
    </button>

  </div>

            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

<div className="flex flex-col gap-3">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">All Admin</h2>

    <input
      type="text"
      placeholder="Search users..."
      className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
    <table className="min-w-full text-sm">

      {/* Head */}
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="py-3 px-6 text-left">#</th>
          <th className="py-3 px-6 text-left">Admin</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Role</th>
          <th className="py-3 px-6 text-left">Joined</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-100">
        {users.filter(user => user.role === "Admin").map((user, index) => (
          <tr
            key={user.id}
            className="hover:bg-gray-50 transition"
          >
            <td className="py-3 px-6 text-gray-500">{index + 1}</td>

            <td className="py-3 px-6 font-medium text-gray-800">
              {user.user}
            </td>

            <td className="py-3 px-6 text-gray-600">
              {user.email}
            </td>

            <td className="py-3 px-6">
              <span
                className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600" 
              >
                {user.role}
              </span>
            </td>

            <td className="py-3 px-6 text-gray-600">
              {user.joined}
            </td>

         
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

      </div>
    </AdminLayout>
  );
};