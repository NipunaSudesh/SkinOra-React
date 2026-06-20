import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "../../Components/Theme/Pagination";
import AdminLayout from "./AdminLayout";
import { Menu } from "lucide-react";
import { FaBoxOpen, FaTags, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    outOfStock: 0,
    inStock: 0,
  });
  const itemsPerPage = 15;

  const API_URL = process.env.REACT_APP_SKINORA_API_URL;

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    shortDescription: "",
    longDescription: {
      overview: "",
      howToUse: "",
      keyUses: [],
      keyIngredients: [],
    },
    tags: [],
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      const data = res.data.data;
      setProducts(data);

      // Compute stats from product list
      const categories = new Set(data.map((p) => p.category).filter(Boolean));
      const outOfStock = data.filter((p) => p.stockStatus !== "IN_STOCK").length;
      const inStock = data.filter((p) => p.stockStatus === "IN_STOCK").length;

      setStats({
        totalProducts: data.length,
        totalCategories: categories.size,
        outOfStock,
        inStock,
      });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= CREATE PRODUCT =================
  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", newProduct.name);
      formData.append("brand", newProduct.brand);
      formData.append("category", newProduct.category);
      formData.append("price", newProduct.price);
      formData.append("qty", newProduct.quantity);
      formData.append("shortDescription", newProduct.shortDescription);
      formData.append("longDescription", JSON.stringify(newProduct.longDescription));
      formData.append("tags", JSON.stringify(newProduct.tags || []));

      if (file) {
        formData.append("image", file);
      }

      await axios.post(`${API_URL}/api/admin/create-product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsAddOpen(false);
      setFile(null);
      setNewProduct({
        name: "",
        brand: "",
        category: "",
        price: "",
        quantity: "",
        shortDescription: "",
        longDescription: { overview: "", howToUse: "", keyUses: [], keyIngredients: [] },
        tags: [],
      });
      fetchProducts();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/api/admin/update-product/${selectedProduct._id}`,
        selectedProduct,
        { headers: { Authorization: `Bearer ${token}` } }
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
      await axios.delete(`${API_URL}/api/admin/delete-product/${productToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // ================= STAT CARDS CONFIG =================
  const productStats = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: FaBoxOpen,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: FaTags,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: FaExclamationTriangle,
      bg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: FaCheckCircle,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <AdminLayout open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6 bg-[#f5f4f0] min-h-screen flex flex-col gap-6">

        {/* MOBILE MENU */}
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
            <p className="text-sm text-gray-500">Manage products, categories and stock</p>
          </div>
          <div>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-primary text-white p-4 rounded-xl shadow hover:-translate-y-1 font-semibold hover:bg-secondary"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productStats.map((stat, index) => (
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

        {/* SEARCH ROW */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">All Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
            <tbody>
              {paginate(products).map((p, index) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(page - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">
                    Rs. {p.price}
                    {p.oldPrice && (
                      <span className="text-gray-400 line-through ml-2 text-xs">
                        {p.oldPrice}
                      </span>
                    )}
                  </td>
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
                  <td className="px-8">{p.qty}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => { setSelectedProduct(p); setIsEditOpen(true); }}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => { setProductToDelete(p); setIsDeleteOpen(true); }}
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
            <div className="bg-white p-6 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-primary">Edit Product</h2>

              {/* Product Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={selectedProduct?.name || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Brand + Category */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={selectedProduct?.brand || ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={selectedProduct?.category || ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              {/* Price + Quantity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={selectedProduct?.price || ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={selectedProduct?.qty ?? ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, qty: Number(e.target.value) })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  value={selectedProduct?.shortDescription || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, shortDescription: e.target.value })}
                  className="w-full border p-2 rounded mb-3"
                />
              </div>

              {[
                { label: "Overview", key: "overview" },
                { label: "How To Use", key: "howToUse" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <textarea
                    value={selectedProduct?.longDescription?.[key] || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        longDescription: { ...selectedProduct.longDescription, [key]: e.target.value },
                      })
                    }
                    className="w-full border p-2 rounded mb-3"
                  />
                </div>
              ))}

              {[
                { label: "Key Uses (comma separated)", key: "keyUses" },
                { label: "Key Ingredients (comma separated)", key: "keyIngredients" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={selectedProduct?.longDescription?.[key]?.join(", ") || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        longDescription: {
                          ...selectedProduct.longDescription,
                          [key]: e.target.value.split(",").map((i) => i.trim()),
                        },
                      })
                    }
                    className="w-full border p-2 rounded mb-3"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-300 rounded min-w-20 hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-primary text-white rounded min-w-20 hover:bg-secondary transition">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE MODAL ================= */}
        {isDeleteOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h2 className="text-lg font-bold mb-3">Delete Product</h2>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productToDelete?.name}</span>?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADD MODAL ================= */}
        {isAddOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[800px] max-h-[100vh] overflow-y-auto shadow-lg">
              <h2 className="text-lg font-semibold mb-6 text-primary">Add Product</h2>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input
                      className="w-full border p-2 rounded"
                      placeholder="Enter brand"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      className="w-full border p-2 rounded"
                      placeholder="Enter category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      placeholder="Enter price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      placeholder="Enter quantity"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={3}
                    placeholder="Enter short description"
                    value={newProduct.shortDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                  />
                </div>

                {[
                  { label: "Overview", key: "overview", rows: 4 },
                  { label: "How to Use", key: "howToUse", rows: 3 },
                ].map(({ label, key, rows }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <textarea
                      className="w-full border p-2 rounded"
                      rows={rows}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={newProduct.longDescription[key]}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          longDescription: { ...newProduct.longDescription, [key]: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}

                {[
                  { label: "Key Uses", key: "keyUses", placeholder: "e.g. Hydration, Brightening" },
                  { label: "Key Ingredients", key: "keyIngredients", placeholder: "e.g. Aloe Vera, Vitamin C" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      className="w-full border p-2 rounded"
                      placeholder={`Comma separated (${placeholder})`}
                      value={newProduct.longDescription[key]?.join(", ")}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          longDescription: {
                            ...newProduct.longDescription,
                            [key]: e.target.value.split(",").map((i) => i.trim()),
                          },
                        })
                      }
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button onClick={handleCreateProduct} className="px-4 py-2 bg-primary text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};