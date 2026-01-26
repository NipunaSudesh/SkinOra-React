import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);

  /* LOAD CART FROM LOCALSTORAGE */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("skinora_cart")) || [];
    setCartItems(cart);
  }, []);

  /* UPDATE QUANTITY */
  const updateQty = (id, qty) => {
    const updated = cartItems.map((item) =>
      item.slug === id ? { ...item, qty: Math.max(1, qty) } : item
    );
    setCartItems(updated);
    localStorage.setItem("skinora_cart", JSON.stringify(updated));
  };

  /* REMOVE ITEM */
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.slug !== id);
    setCartItems(updated);
    localStorage.setItem("skinora_cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Rs. {item.price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQty(item.slug, item.qty - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.slug, item.qty + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.slug)}
                    className="ml-auto text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs. {total}.00</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>Rs. {total}.00</span>
          </div>

          <button className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
