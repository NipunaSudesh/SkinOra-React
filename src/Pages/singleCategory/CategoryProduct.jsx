import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/card/ProductCard";
import { Header } from "../../components/theme/Header";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

export default function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    fetchProducts();
    setCurrentPage(1); // reset page when category changes
  }, [slug]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${SKINORA_API_URL}/api/getproducts`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const filtered = data.filter(
          (product) => product.categorySlug === slug
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 🔹 Pagination calculations
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <div className="mt-10 flex flex-col items-center">
      <Header
        Title={slug.replace("-", " ").toUpperCase()}
        discription="Premium Skincare And Beauty, Chosen Just For You"
      />
<div className="flex text-start w-full">
    <h2 className='text-gray-600 mx-8'>Showing <span className='text-secondary'>1-8</span> of <span className='text-secondary'>{products.length}</span> products</h2>
</div>
      {/* Products */}
      <div className="flex gap-4 mt-8 justify-center flex-wrap ">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.slug}
              id={product.slug}
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
          <p className="text-gray-500 mt-6">No products found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-10">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-40  text-white bg-primary hover:bg-secondary"
          >
            Previous
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full border text-sm font-medium
                  ${
                    currentPage === page
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-black"
                  }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-40 text-white bg-primary hover:bg-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
