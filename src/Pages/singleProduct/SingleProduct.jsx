import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { Truck, ShieldCheck } from "lucide-react";
import Typography from "../../Components/Theme/Typography";
import ProductCart from "../../Components/cart/ProductCart";
import { Header } from "../../Components/Theme/Header";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function SingleProduct() {
  const { slug } = useParams();
const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);


  useEffect(() => {
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

    fetchProduct();
  }, [slug]);


  useEffect(() => {
    if (!product?.categorySlug) return;

    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `${SKINORA_API_URL}/api/categories/${product.categorySlug}`
        );

        const data = await res.json();

        const filtered = data.filter(
          (p) => p.slug !== product.slug
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [product]);



  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

const handleCart = () => {
  navigate("/cart");
};
const HandleCheckOut = () => {
  navigate("/checkout");
};

  return (
    <>
      <section>
        <div className="flex flex-col md:flex-row gap-6 p-4 items-start">

          {/* IMAGE */}
          <div className="w-full md:w-1/2 p-4 shadow-lg rounded-lg bg-white">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[420px] object-contain"
            />
          </div>

          {/* DETAILS */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">

            <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-2">

              {/* BRAND + STOCK */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  {product.brand}
                </h2>

                {product.stockStatus && (
                  <span
                    className={`px-3 py-1 rounded-xl text-white text-sm font-medium ${
                      product.stockStatus === "IN_STOCK"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.stockStatus.toLowerCase().replace("_", " ")}
                  </span>
                )}
              </div>

              {/* NAME */}
              <h1 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h1>

              {/* RATING */}
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

              {/* PRICE */}
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

              {/* QUANTITY */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center justify-between rounded-full border border-gray-300 px-4 py-2 w-32">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>

                <button className="flex-1 rounded-full border px-6 py-3" onClick={handleCart}>
                  Add to cart
                </button>

                <button className="flex-1 rounded-full bg-[#02004f] px-6 py-3 text-white" onClick={HandleCheckOut}>
                  Buy now
                </button>
              </div>

              {/* INFO */}
              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Island-wide shipping available
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  100% Authentic Products
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <Typography variant="h4" className="underline">
                Description
              </Typography>

              <p className="mt-2">
                {product.longDescription?.overview}
              </p>


              <Typography variant="h5" className="underline mt-4">
                Key Uses
              </Typography>

              <ul className="list-disc list-inside mt-2">
                {product.longDescription?.keyUses?.map((use, i) => (
                  <li key={i}>{use}</li>
                ))}
              </ul>

              <Typography variant="h5" className="underline mt-4">
                Key Ingredients
              </Typography>

              <ul className="list-disc list-inside mt-2">
                {product.longDescription?.keyIngredients?.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
                            <Typography variant="h5" className="underline mt-2">
                how To Use
              </Typography>

              <p className="mt-2">
                {product.longDescription?.howToUse}
              </p>
            </div>
          </div>
        </div>
      </section>

 
      <section className="mt-10">
        <Header Title="You May Also Like" />

        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          {products.slice(0, 10).map((item) => (
            <ProductCart
              key={item._id}
              slug={item.slug}
              imgUrl={item.imageUrl}
              productName={item.name}
              productDesc={item.shortDescription}
              rating={item.rating}
              OPrice={item.oldPrice}
              NPrice={item.price}
              reviewCount={item.reviewCount}
            />
          ))}
        </div>
      </section>
    </>
  );
}
