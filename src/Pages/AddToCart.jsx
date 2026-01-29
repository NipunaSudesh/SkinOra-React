import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCart from "../Components/cart/AddCart";
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate =useNavigate();
  const shipping_fee =350;
const SHIPPING_FEE = shipping_fee*selectedItems.length

const toggleSelectItem = (slug) => {
  setSelectedItems((prev) =>
    prev.includes(slug)
      ? prev.filter((s) => s !== slug) // unselect
      : [...prev, slug]               // select
  );
};

  /* FETCh CART */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${SKINORA_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // map backend cart -> frontend format
      const formatted = data.map((item) => ({
        ...item.product,
        qty: item.qty,
      }));

      setCartItems(formatted);
      console.log("Cart data:", formatted);
    } catch (error) {
      console.log("Error fetching cart:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (slug, qty) => {
  if (qty < 1) return;

  const product = cartItems.find((i) => i.slug === slug);
  if (!product) return;

  try {
    const token = localStorage.getItem("token");

    await fetch(`${SKINORA_API_URL}/api/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        qty,
      }),
    });

    fetchCart();
  } catch (error) {
    console.log("Error updating qty:", error.message);
  }
};
const removeItem = async (slug) => {
  const product = cartItems.find((i) => i.slug === slug);
  if (!product) return;

  try {
    const token = localStorage.getItem("token");

    await fetch(`${SKINORA_API_URL}/api/cart/remove/${product._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  } catch (error) {
    console.log("Error removing item:", error.message);
  }
};
const selectedCartItems = cartItems.filter((item) =>
  selectedItems.includes(item.slug)
);

  const SubTotal = selectedCartItems.reduce(
    (sum, item) => sum  + item.price * item.qty,
    0
  );
  const total = SubTotal + SHIPPING_FEE;

const handleCheckOut = () => {
  if (selectedCartItems.length === 0) {
    alert("Please select at least one item to proceed to checkout.");
    return;
  }

  navigate("/checkout", {
    state: {
      items: selectedCartItems,
      subtotal: SubTotal,
      shipping: SHIPPING_FEE,
      total,
    },
  });
};


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
    <section className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row w-full gap-6">
        
        <div className="w-full space-y-4 lg:w-3/5">
      <div className="md:col-span-2 space-y-4">
  {cartItems.map((item) => (
            <AddCart
              key={item.slug}
              {...item}
              onQtyChange={updateQty}
              onSelect={() => toggleSelectItem(item.slug)}
              onRemove={removeItem}
              mode="cart"
            />

  ))}
</div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white w-full lg:w-2/5 p-6 rounded-lg shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs. {SubTotal}.00</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Rs. {SHIPPING_FEE}.00</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>Rs. {total}.00</span>
          </div>

          <button onClick={handleCheckOut} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
