import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../theme/Button";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const img =
  "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030903/toiletries_yruvh2.webp";

export default function ProductCard({ id }) {
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // share logic here (copy link / navigator.share)
    console.log("Share clicked");
  };

  return (
    <Link to={`/product/${id}`} className="group w-60">
      <div className="relative flex flex-col cursor-pointer">

        {/* Image */}
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          <img
            src={img}
            alt="single product"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       bg-black/50 opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"
          >
            <div className="flex gap-4">

              {/* Heart */}
              <button
                onClick={handleLike}
                className="p-3 bg-white rounded-full shadow
                           hover:scale-110 transition"
              >
                <FaHeart
                  size={22}
                  className={liked ? "text-red-500" : "text-gray-700"}
                />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-full shadow
                           hover:scale-110 transition"
              >
                <FaShare size={20} className="text-gray-700" />
              </button>

            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start mt-3">
          <h4 className="font-bold text-primary group-hover:text-secondary transition">
            Skincare
          </h4>
          <p className="text-gray-600">Discover our range of skincare .</p>
          <div className="flex">
            <CiStar className="text-secondary"/>
            <CiStar className="text-secondary"/>
            <CiStar className="text-secondary"/>
            <CiStar className="text-secondary"/>
          </div>
          <div className="flex gap-4">
          <p className="text-gray-500 mt-1">Rs.20000</p>
          <p className="text-xl">Rs.20000</p>
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="secondary">Add To Cart</Button>
            <Button variant="primary">Buy Now</Button>
          </div>
        </div>

      </div>
    </Link>
  );
}
