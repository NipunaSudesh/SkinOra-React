import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCart from "../Components/cart/AddCart";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { items, subtotal, shipping, total } = state;

  return (
  <section className="w-full mx-auto p-4">
  <h1 className="text-2xl font-bold mb-6">Checkout</h1>

  {/* MAIN LAYOUT */}
  <div className="flex flex-col lg:flex-row gap-6">

    {/* LEFT SIDE */}
    <div className="w-full lg:w-3/5 space-y-8">

      {/* SHIPPING INFO */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <button className="text-blue-500 font-medium hover:underline">
            Edit 
          </button>
        </div>

        <p>Full Name: <span className="font-medium">Nipuna Sudesh</span></p>
        <p>Phone Number: <span className="font-medium">0766521915</span></p>
        <p>Address: <span className="font-medium">Colombo, Sri Lanka</span></p>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <AddCart
            key={item.slug}
            {...item}
            mode="checkout"
          />
        ))}
      </div>
    </div>

    {/* RIGHT SIDE – ORDER SUMMARY */}
    <div className="w-full lg:w-2/5">
      <div className="bg-white p-6 rounded-lg shadow lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>Rs. {subtotal}.00</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Shipping</span>
          <span>Rs. {shipping}.00</span>
        </div>

        <hr className="mb-4" />

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>Rs. {total}.00</span>
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-lg">
          Place Order
        </button>
      </div>
    </div>

  </div>
</section>

  );
}
