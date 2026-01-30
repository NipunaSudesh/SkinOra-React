import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCart from "../Components/cart/ProductCart";

 const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function SearchProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${SKINORA_API_URL}/api/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* FILTER PRODUCTS USING QUERY */
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(query.toLowerCase()) ||
      product.shortDescription?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [query, products]);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCart
              key={product.slug}
              id={product.slug}
              slug={product.slug}
              imgUrl={product.imageUrl}
              productName={product.name}
              productDesc={product.shortDescription}
              rating={product.rating}
              OPrice={product.oldPrice}
              NPrice={product.price}
              reviewCount={product.reviewCount}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
