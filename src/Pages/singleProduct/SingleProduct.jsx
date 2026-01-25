import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { Truck, ShieldCheck } from "lucide-react";
import Typography from "../../components/theme/Typography";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${SKINORA_API_URL}/api/products/slug/${slug}`
      );
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 items-start">
      
      {/* Image Section */}
      <div className="w-full md:w-1/2 p-4 shadow-lg rounded-lg bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[420px] object-contain"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
      <div className=" bg-gray-100 p-6 rounded-lg flex flex-col gap-2 self-start w-full">

        {/* Brand + Stock */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            {product.brand}
          </h2>

          <span
            className={`px-3 py-1 rounded-xl text-white text-sm font-medium ${
              product.stockStatus === "IN_STOCK"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {product.stockStatus.toLowerCase().replace("_", " ")}
          </span>
        </div>

        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-800">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <CiStar
              key={i}
              className={`text-xl ${
                i < product.rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          {product.oldPrice && (
            <p className="text-gray-400 line-through">
              Rs. {product.oldPrice}
            </p>
          )}
          {product.discountPercent && (
            <p className="text-red-500 font-medium">
              SAVE {product.discountPercent}% OFF
            </p>
          )}
        </div>

        <p className="text-3xl font-bold text-primary">
          Rs. {product.price}.00
        </p>

        {/* Quantity + Buttons */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Quantity Selector */}
          <div className="flex items-center justify-between rounded-full border border-gray-300 px-4 py-2 w-32">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="text-lg font-medium text-gray-600 hover:text-black"
            >
              −
            </button>

            <span className="font-semibold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="text-lg font-medium text-gray-600 hover:text-black"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <button className="flex-1 rounded-full border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50">
            Add to cart
          </button>

          <button className="flex-1 rounded-full bg-[#02004f] px-6 py-3 font-semibold text-white hover:bg-[#03006a]">
            Buy now
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>
              <strong>Delivery:</strong> Island-wide shipping available
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>
              <strong>100% Authentic Products</strong> — sourced from trusted distributors
            </span>
          </div>
        </div>

      </div>
         <div className=" bg-gray-100 p-6 rounded-lg flex flex-col gap-2 self-start w-full">
          <Typography variant="h4" className="text-gray-800 underline">Discription</Typography>
          <p className="text-gray-700 mt-2">
            {product.longDescription.overview}
          </p>


<Typography variant="h5" className="text-gray-800 underline">
  Key Uses
</Typography>

<ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
  {product.longDescription.keyUses.map((use, index) => (
    <li key={index}>{use}</li>
  ))}
</ul>


<Typography variant="h5" className="text-gray-800 underline">
 keyIngredients
</Typography>

<ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
  {product.longDescription.keyIngredients.map((use, index) => (
    <li key={index}>{use}</li>
  ))}
</ul>


         </div>
         </div>
    </div>
  );
}
