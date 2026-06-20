import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "../../Components/Theme/Pagination";
import AdminLayout from "./AdminLayout";
import { Menu } from "lucide-react";
import {
  FaUsers,  FaUser,  FaUserShield,  FaCrown,} from "react-icons/fa";

export const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [LogedUser, setLoggedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userPage, setUserPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const API_URL = process.env.REACT_APP_SKINORA_API_URL;
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [file, setFile] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    shortDescription: "",
    longDescription: {
      overview: "",
      howToUse: "",
      keyUses: [],
      keyIngredients: [],
    },
    tags: [],
  });

  // ---------------- CREATE PRODUCT ----------------
  const handleCreateProduct = async () => {
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("brand", newProduct.brand);
    formData.append("price", newProduct.price);
    formData.append("shortDescription", newProduct.shortDescription);

    formData.append(
      "longDescription",
      JSON.stringify(newProduct.longDescription)
    );

    formData.append("tags", JSON.stringify(newProduct.tags));

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Created:", data);

      setIsAddOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API_URL}/api/admin/${selectedProduct._id}`,
        selectedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsEditOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/admin/${productToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsDeleteOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PAGINATION =================
  const paginate = (data) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };
const userStats = [
  {
    title: "Total Users",
      value:10,
    //  value: allUsers.length,
    color: "text-green-600",
    icon: FaUsers,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Users",
      value:10,
    // value: usersList.length,
    color: "text-blue-600",
    icon: FaUser,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Admins",
      value:10,
    // value: adminsList.length,
    color: "text-purple-600",
    icon: FaUserShield,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Super Admins",
    value:10,
    // value: superAdminsList.length,
    color: "text-red-600",
    icon: FaCrown,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
];
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

      {/* HEADER */}
  
<div className="flex justify-between">
                <div>
          <h1 className="text-2xl font-bold text-primary">Product Management</h1>
          <p className="text-sm text-gray-500">Manage product, Catageries and permissions</p>
        </div>
        <div>
          <button onClick={() => setIsAddOpen(true)} className="bg-primary text-white p-4 rounded-xl shadow hover:-translate-y-1 font-semibold hover:bg-secondary"> Add product</button>
        </div>
</div>

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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">All Products</h2>
            <input type="text" placeholder="Search users..." className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Quantity</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
      <div className="mt-4">
        {/* <Pagination
          currentPage={page}
          totalPages={Math.ceil(products.length / itemsPerPage)}
          onPageChange={setPage}
        /> */}
      </div>
          <tbody>
            {paginate(products,page).map((p,index) => (
                    // {paginate(usersList, userPage).map((user, idx) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                
                {/* IMAGE */}
                <td className="p-3">{(page - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-medium">{p.name}</td>

                {/* BRAND */}
                <td className="p-3">{p.brand}</td>

                {/* CATEGORY */}
                <td className="p-3">{p.category}</td>

                {/* PRICE */}
                <td className="p-3">
                  Rs. {p.price}
                  {p.oldPrice && (
                    <span className="text-gray-400 line-through ml-2 text-xs">
                      {p.oldPrice}
                    </span>
                  )}
                </td>

                {/* STOCK */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.stockStatus === "IN_STOCK"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.stockStatus}
                  </span>
                </td>

                {/* QUANTITY */}
                <td className="px-8">{p.qty}</td>

                {/* ACTION */}
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsEditOpen(true);
                      }}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setProductToDelete(p);
                        setIsDeleteOpen(true);
                      }}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
   
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(products.length / itemsPerPage)}
          onPageChange={setPage}
        />
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto shadow-lg">

      <h2 className="text-lg font-semibold mb-4 text-primary">
        Edit Product
      </h2>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={selectedProduct?.name || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              name: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* BRAND */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <input
          type="text"
          value={selectedProduct?.brand || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              brand: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="number"
          value={selectedProduct?.price || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              price: Number(e.target.value),
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* SHORT DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short Description
        </label>
        <textarea
          value={selectedProduct?.shortDescription || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              shortDescription: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* LONG DESCRIPTION - OVERVIEW */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overview
        </label>
        <textarea
          value={selectedProduct?.longDescription?.overview || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              longDescription: {
                ...selectedProduct.longDescription,
                overview: e.target.value,
              },
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* HOW TO USE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How To Use
        </label>
        <textarea
          value={selectedProduct?.longDescription?.howToUse || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              longDescription: {
                ...selectedProduct.longDescription,
                howToUse: e.target.value,
              },
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* KEY USES (comma separated) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key Uses (comma separated)
        </label>
        <input
          type="text"
          value={selectedProduct?.longDescription?.keyUses?.join(", ") || ""}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              longDescription: {
                ...selectedProduct.longDescription,
                keyUses: e.target.value.split(",").map((i) => i.trim()),
              },
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* KEY INGREDIENTS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key Ingredients (comma separated)
        </label>
        <input
          type="text"
          value={
            selectedProduct?.longDescription?.keyIngredients?.join(", ") || ""
          }
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              longDescription: {
                ...selectedProduct.longDescription,
                keyIngredients: e.target.value
                  .split(",")
                  .map((i) => i.trim()),
              },
            })
          }
          className="w-full border p-2 rounded mb-3"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded min-w-20 hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-primary text-white rounded min-w-20 hover:bg-secondary transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-lg font-bold mb-3">Delete Product</h2>

            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {productToDelete?.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto shadow-lg">

            <h2 className="text-lg font-semibold mb-4 text-primary">
              Add Product
            </h2>

            {/* NAME */}
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* BRAND */}
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
            />

            {/* PRICE */}
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* SHORT DESCRIPTION */}
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Short Description"
              value={newProduct.shortDescription}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  shortDescription: e.target.value,
                })
              }
            />

            {/* OVERVIEW */}
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Overview"
              value={newProduct.longDescription.overview}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  longDescription: {
                    ...newProduct.longDescription,
                    overview: e.target.value,
                  },
                })
              }
            />

            {/* HOW TO USE */}
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="How to use"
              value={newProduct.longDescription.howToUse}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  longDescription: {
                    ...newProduct.longDescription,
                    howToUse: e.target.value,
                  },
                })
              }
            />

            {/* KEY USES */}
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Key Uses (comma separated)"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  longDescription: {
                    ...newProduct.longDescription,
                    keyUses: e.target.value.split(",").map((i) => i.trim()),
                  },
                })
              }
            />

            {/* KEY INGREDIENTS */}
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Key Ingredients (comma separated)"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  longDescription: {
                    ...newProduct.longDescription,
                    keyIngredients: e.target.value
                      .split(",")
                      .map((i) => i.trim()),
                  },
                })
              }
            />

            {/* IMAGE */}
            <input
              type="file"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateProduct}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};
