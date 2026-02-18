import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCart from "../Components/cart/AddCart";
import TextInput from "../Components/Theme/TextInput";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  if (!state) {
    navigate("/");
    return null;
  }

  const { items, subtotal, shipping, total } = state;

  const handlePlaceOrder = async () => {
    // Basic client-side validation
    if (
      !shippingInfo.firstName.trim() ||
      !shippingInfo.lastName.trim() ||
      !shippingInfo.phone.trim() ||
      !shippingInfo.email.trim() ||
      !shippingInfo.address.trim()
    ) {
      setErrorMsg("Please fill in all shipping information");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMsg("Please login again");
        setTimeout(() => navigate("/login"), 1800);
        return;
      }

      // Prepare payload – adjust structure to match what your backend expects
      const orderData = {
        items: items.map((item) => ({
          product: item._id || item.id, // or item.slug — depends on your backend
          qty: item.quantity || 1,
          price: item.price,
        })),
        shippingInfo: { ...shippingInfo },
        subtotal,
        shipping,
        totalAmount: total,
        // You can add more fields if needed (paymentMethod, etc.)
      };

      const response = await fetch("http://localhost:5000/api/auth/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      // Success
      // You can clear cart here if your app manages cart in localStorage/context
      // localStorage.removeItem("cart"); // ← optional

      navigate("/thankyou", { state: { orderId: result.order?._id } });

    } catch (err) {
      console.error("Order placement error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full mx-auto p-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {errorMsg}
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-[700px] lg:max-w-[900px] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Shipping Information</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">First Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter Your First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Last Name</label>
                  <TextInput
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Phone Number</label>
                  <TextInput
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <TextInput
                    type="email"
                    placeholder="Enter Your Email"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <TextInput
                  placeholder="Enter Your Full Address"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-5 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-3/5 space-y-8">
          {/* SHIPPING INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <button
                className="text-blue-600 hover:underline font-medium"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </button>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Full Name:</span>{" "}
                {shippingInfo.firstName && shippingInfo.lastName
                  ? `${shippingInfo.firstName} ${shippingInfo.lastName}`
                  : "Not provided"}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {shippingInfo.phone || "Not provided"}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {shippingInfo.email || "Not provided"}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {shippingInfo.address || "Not provided"}
              </p>
            </div>
          </div>

          {/* CART ITEMS */}
          <div className="space-y-4">
            {items.map((item) => (
              <AddCart key={item.slug || item._id} {...item} mode="checkout" />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="w-full lg:w-2/5">
          <div className="bg-white p-6 rounded-xl shadow lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className={`w-full py-3.5 rounded-lg font-medium text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary"
              }`}
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}