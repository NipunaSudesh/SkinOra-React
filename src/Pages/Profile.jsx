import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [showEdit, setShowEdit] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const avatarUrl = user.image
    ? user.image
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;

  // logout
  const handleLogout = () => {
    setMessage("Logged out successfully ✅");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }, 1200);
  };

  // save edited profile
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setShowEdit(false);
    setMessage("Profile updated successfully 🎉");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

        {/* Message */}
        {message && (
          <div className="mb-4 text-center text-green-600 font-medium">
            {message}
          </div>
        )}

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Role</span>
            <span className="font-medium">User</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Joined</span>
            <span className="font-medium">
              {new Date(user.createdAt).getFullYear()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => setShowEdit(true)}
            className="bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        {/* Edit Modal */}
        {showEdit && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
                className="w-full border rounded p-2 mb-3"
                placeholder="Name"
              />

              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                className="w-full border rounded p-2 mb-4"
                placeholder="Email"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary text-white py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEdit(false)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
