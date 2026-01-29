import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AddCart from "../Components/cart/AddCart";
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate =useNavigate();
const SHIPPING_FEE = 350;

// const [cartItems, setCartItems] = useState([

// {
//   Id: "69647f01102f4ba46eac224a",
//   name: "Cetaphil Baby Daily Lotion 400ml",
//   slug: "cetaphil-baby-daily-lotion-400ml",
//   imageUrl: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768103827/cetaphil-baby-daily-lotion-1_apvbs0.webp",

//   price: 6200,
//   oldPrice: 7000,
//   discountPercent: 11,

//   qty: 1,

//   stockStatus: "IN_STOCK",
//   category: "Baby Care",
//   brand: "Cetaphil"
// },
// {
//   Id: "69647f01102f4ba46eac224a",
//   name: "Cetaphil Baby Daily Lotion 400ml",
//   slug: "cetaphil-baby-daily-lotion-400ml",
//   imageUrl: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768103827/cetaphil-baby-daily-lotion-1_apvbs0.webp",

//   price: 6200,
//   oldPrice: 7000,
//   discountPercent: 11,

//   qty: 1,

//   stockStatus: "IN_STOCK",
//   category: "Baby Care",
//   brand: "Cetaphil"
// },

//   ]);


  /* FETCH CART */
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

  // const updateQty = (slug, qty) => {
  //   if (qty < 1) return;
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.slug === slug ? { ...item, qty } : item
  //     )
  //   );
  // };

  // const removeItem = (slug) => {
  //   setCartItems((prev) =>
  //     prev.filter((item) => item.slug !== slug)
  //   );
  // };

  const SubTotal = cartItems.reduce(
    (sum, item) => sum  + item.price * item.qty,
    0
  );
  const total = SubTotal + SHIPPING_FEE;
const handleCheckOut =()=>{
navigate('/checkout');
}

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
              onRemove={removeItem}
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
