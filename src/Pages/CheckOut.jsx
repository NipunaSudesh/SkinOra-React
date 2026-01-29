import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCart from "../Components/cart/AddCart";
import TextInput from "../Components/Theme/TextInput";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  return (

    
  <section className="w-full mx-auto p-4">
  <h1 className="text-2xl font-bold mb-6">Checkout</h1>
{isEditOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-full max-w-[700px] lg:max-w-[900px] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Edit Shipping Information
      </h2>

      <div className=" flex flex-col">
<div className="flex flex-col md:flex-row w-full gap-4">
  <div className=" flex flex-col w-full">
            <label className="text-gray-800 mt-2">Frist Name</label>
        <TextInput
          type="text"
          placeholder="Enter Your Frist Name"
          value={shippingInfo.firstName}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, firstName: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />
        </div>
        <div className=" flex flex-col w-full">
          <label className="text-gray-800 mt-2">Last Name</label>
        <TextInput
          type="text"
          placeholder="Enter Your Last Name"
          value={shippingInfo.lastName}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, lastName: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />
        </div>
</div>
<div className="flex flex-col md:flex-row w-full gap-4">
<div className=" flex flex-col w-full">
    <label className="text-gray-800 mt-2">Phone Number</label>
        <TextInput
          type="text"
          placeholder="Enter Your Phone Number"
          value={shippingInfo.phone}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, phone: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />
</div>
<div className=" flex flex-col w-full">
    <label className="text-gray-800 mt-2">Email</label>
        <TextInput
          type="text"
          placeholder="Enter Your Email"
          value={shippingInfo.email}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, email: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />
</div>
</div>
  <label className="text-gray-800 mt-2">Address</label>
        <TextInput
          placeholder="Enter Your Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

  {/* MAIN LAYOUT */}
  <div className="flex flex-col lg:flex-row gap-6">

    {/* LEFT SIDE */}
    <div className="w-full lg:w-3/5 space-y-8">

      {/* SHIPPING INFO */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <button className="text-blue-500 font-medium hover:underline" onClick={() => setIsEditOpen(true)}>
            Edit 
          </button>
        </div>
<div className="flex w-full gap-4">
  <p>
  Full Name: 
  <span className="font-medium">
    {" " + shippingInfo.firstName + " " + shippingInfo.lastName || "null"}
  </span>
</p>

<p>
  Phone Number: 
  <span className="font-medium">
    {" "+shippingInfo.phone || "null"}
  </span>
</p>

</div>
<p>
  Email:
  <span className="font-medium">
    {" "+shippingInfo.email || "null"}
  </span>
</p>
<p>
  Address:
  <span className="font-medium">
    {" "+shippingInfo.address || "null"}
  </span>
</p>

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
