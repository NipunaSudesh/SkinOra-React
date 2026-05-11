import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Menu } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUserFromToken } from "../../utils/auth";
import { Pagination } from "../../Components/Theme/Pagination";

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
  // 🔵 USERS (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    user: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    role: "User",
    status: ["Active", "Blocked", "Pending"][i % 3],
    joined: `2026-03-${(i % 28) + 1}`,
  })),

  // 🟣 ADMINS (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 21,
    user: `Admin ${i + 1}`,
    email: `admin${i + 1}@mail.com`,
    role: "Admin",
    status: ["Active", "Blocked", "Pending"][i % 3],
    joined: `2026-04-${(i % 28) + 1}`,
  })),

  // 🔴 SUPER ADMINS (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 41,
    user: `SuperAdmin ${i + 1}`,
    email: `superadmin${i + 1}@mail.com`,
    role: "Super Admin",
    status: ["Active", "Blocked", "Pending"][i % 3],
    joined: `2026-05-${(i % 28) + 1}`,
  })),
];

export const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [LogedUser, setLoggedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [allUsers, setAllUsers] = useState(users); 
  const [userPage, setUserPage] = useState(1);
  const [adminPage, setAdminPage] = useState(1);
  const [superAdminPage, setSuperAdminPage] = useState(1);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const decodedUser = getUserFromToken();
    setLoggedUser(decodedUser);
  }, []);

  const handleEditClick = (user) => {
  setSelectedUser(user);
  setIsModalOpen(true);
};
const handleDeleteClick = (user) => {
  setUserToDelete(user);
  setIsDeleteModalOpen(true);
};
  // Filtered Lists
  const usersList = users.filter(u => u.role === "User");
  const adminsList = users.filter(u => u.role === "Admin");
  const superAdminsList = users.filter(u => u.role === "Super Admin");

  // Pagination Helper
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

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
          <h1 className="text-2xl font-bold text-primary">Users Management</h1>
          <p className="text-sm text-gray-500">Manage users, admins and permissions</p>
        </div>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-primary">Edit User</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <input
        type="text"
        value={selectedUser?.name || ""}
        onChange={(e) =>
          setSelectedUser({ ...selectedUser, name: e.target.value })
        }
        className="w-full border p-2 rounded mb-3"
        placeholder="Name"
      />
      </div>

<div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        value={selectedUser?.email || ""}
        onChange={(e) =>
          setSelectedUser({ ...selectedUser, email: e.target.value })
        }
        className="w-full border p-2 rounded mb-3"
        placeholder="Email"
      />
</div>
<div>
        <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
      <select
        value={selectedUser?.role || "User"}
        onChange={(e) =>
          setSelectedUser({ ...selectedUser, role: e.target.value })
        }
        className="w-full border p-2 rounded mb-3"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
</div>

      <div className="flex justify-end gap-2 ">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded min-w-20 hover:bg-gray-400 transition cursor-pointer"
        >
          Cancel
        </button>

        <button onClick={() => setIsModalOpen(false)}
          // onClick={handleUpdateUser}
          className="px-4 py-2 bg-primary min-w-20 text-white rounded cursor-pointer hover:bg-secondary transition"
        >
          Save1
        </button>
      </div>
    </div>
  </div>
)}

{isDeleteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
      <h2 className="text-lg font-semibold text-red-600 mb-3">
        Delete User
      </h2>

      <p className="text-gray-600 mb-5">
        Are you sure you want to delete{" "}
        <span className="font-semibold">
          {userToDelete?.name}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button   onClick={() => setIsDeleteModalOpen(false)}
          // onClick={handleDeleteUser}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border">
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

        {/* ====================== ALL USERS ====================== */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">All Users</h2>
            <input type="text" placeholder="Search users..." className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full text-sm">
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
              <tbody className="divide-y divide-gray-100">
                {paginate(usersList, userPage).map((user, idx) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-6 text-gray-500">{(userPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">{user.user}</td>
                    <td className="py-3 px-6 text-gray-600">{user.email}</td>
                    <td className="py-3 px-6">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">{user.role}</span>
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.joined}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                        onClick={() => handleEditClick(user)}
                         className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"><FaEdit /></button>
                        <button onClick={() => handleDeleteClick(user)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={userPage}
            totalPages={Math.ceil(usersList.length / itemsPerPage)}
            onPageChange={setUserPage}
          />
        </div>

        {/* ====================== ALL ADMINS ====================== */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">All Admin</h2>
            <input type="text" placeholder="Search admins..." className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Admin</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Joined</th>
                  {LogedUser?.role === "super admin" && <th className="py-3 px-6 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginate(adminsList, adminPage).map((user, idx) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-6 text-gray-500">{(adminPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">{user.user}</td>
                    <td className="py-3 px-6 text-gray-600">{user.email}</td>
                    <td className="py-3 px-6">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">{user.role}</span>
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.joined}</td>
                    {LogedUser?.role === "super admin" && (
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"><FaEdit /></button>
                          <button onClick={() => handleDeleteClick(user)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"><FaTrash /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={adminPage}
            totalPages={Math.ceil(adminsList.length / itemsPerPage)}
            onPageChange={setAdminPage}
          />
        </div>

        {/* ====================== ALL SUPER ADMINS ====================== */}
        {LogedUser?.role === "super admin" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">All Super Admin</h2>
              <input type="text" placeholder="Search super admins..." className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-6 text-left">#</th>
                    <th className="py-3 px-6 text-left">Super Admin</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginate(superAdminsList, superAdminPage).map((user, idx) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-6 text-gray-500">{(superAdminPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="py-3 px-6 font-medium text-gray-800">{user.user}</td>
                      <td className="py-3 px-6 text-gray-600">{user.email}</td>
                      <td className="py-3 px-6">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">{user.role}</span>
                      </td>
                      <td className="py-3 px-6 text-gray-600">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={superAdminPage}
              totalPages={Math.ceil(superAdminsList.length / itemsPerPage)}
              onPageChange={setSuperAdminPage}
            />
          </div>
        )}

      </div>
    </AdminLayout>
  );
};