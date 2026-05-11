// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_SKINORA_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const formatted = data.map((item) => ({ ...item.product, qty: item.qty }));
      setCartItems(formatted);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Optimistic update functions
  const addToCartLocal = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.slug === product.slug);
      if (exist) {
        return prev.map((p) =>
          p.slug === product.slug ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const updateQtyLocal = (slug, qty) => {
    setCartItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, qty } : p))
    );
  };

  const removeItemLocal = (slug) => {
    setCartItems((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems,fetchCart, addToCartLocal, updateQtyLocal, removeItemLocal,  }}  >
      {children}
    </CartContext.Provider>
  );
};
