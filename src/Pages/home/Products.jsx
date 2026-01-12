import React, { useEffect, useState } from "react";
import { Header } from "../../components/theme/Header";
import ProductCard from "../../components/card/ProductCard";
import navigate, { useNavigate } from "react-router-dom";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function Products() {
  const navigate =useNavigate();
  const [products, setProducts] = useState([]);

  const handleAllProductsClick =()=>{
    navigate('/all-products');
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${SKINORA_API_URL}/api/getproducts`);
      const data = await res.json();

      // API RETURNS ARRAY DIRECTLY
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center">
      <Header
        Title="Featured Products"
        discription="Premium Skincare And Beauty, Chosen Just For You"
      />

      <div className="flex gap-2 mt-8 justify-center flex-wrap">
        {products.slice(0, 10).map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            imgUrl={product.imageUrl}
            productName={product.name}
            productDesc={product.shortDescription}
            rating={product.rating}
            OPrice={product.oldPrice}
            NPrice={product.price}
            reviewCount={product.reviewCount}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center">
      <button className="bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition duration-200"
      onClick={handleAllProductsClick}
      >View All Products</button>
</div>
    </div>
  );
}
