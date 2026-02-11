import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function ProductCart({
  id,
  slug,
  OPrice,
  NPrice,
  imgUrl,
  productName,
  productDesc,
  rating = 0,
  reviewCount = 0,
}) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { addToCartLocal } = useContext(CartContext); // Use CartContext

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // 1️⃣ Optimistically update cart count immediately
    addToCartLocal({
      _id: id,
      slug,
      price: NPrice,
      name: productName,
      imageUrl: imgUrl,
      qty: 1,
    });

    try {
      // 2️⃣ Call backend API
      const res = await fetch(`${SKINORA_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          qty: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }
      // Optional: navigate("/cart"); // or stay on page
    } catch (error) {
      console.error("Add to cart error:", error.message);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <Link to={`/product/slug/${slug}`} className="group w-64">
      <div className="relative flex flex-col bg-white rounded-xl shadow-md border border-gray-300
                      hover:shadow-2xl transition-all duration-300">

        {/* Image */}
        <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
          <img
            src={imgUrl}
            alt={productName}
            className="w-full h-full object-cover
                       transition-transform duration-500
                       group-hover:scale-110"
          />

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center
                          bg-black/50 opacity-0 group-hover:opacity-100
                          transition-opacity duration-300">
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className="p-3 bg-white rounded-full shadow
                           hover:scale-110 transition"
              >
                <FaHeart
                  size={20}
                  className={liked ? "text-red-500" : "text-gray-600"}
                />
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-full shadow
                           hover:scale-110 transition"
              >
                <FaShare size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 p-4">
          <h4 className="font-semibold text-lg text-primary line-clamp-2 min-h-[60px]">
            {productName}
          </h4>

          <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
            {productDesc}
          </p>

          {/* Rating */}
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <CiStar
                key={i}
                className={`text-lg ${
                  i < rating ? "text-secondary" : "text-gray-300"
                }`}
              />
            ))}
            <p className="text-sm text-gray-500">({reviewCount} reviews)</p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mt-2">
            {OPrice && <p className="text-sm text-gray-400 line-through">Rs. {OPrice}</p>}
            <p className="text-xl font-bold text-primary">Rs. {NPrice}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleCart}
            className="mt-4 flex items-center justify-center gap-2
                       bg-secondary hover:bg-primary
                       text-white py-2 rounded-lg
                       font-semibold shadow
                       transition active:scale-95"
          >
            <FaShoppingCart size={16} />
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
