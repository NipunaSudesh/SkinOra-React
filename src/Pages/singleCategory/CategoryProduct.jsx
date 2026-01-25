import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCart from "../../components/cart/ProductCart";
import { Header } from "../../components/theme/Header";
import ProductFilter from "../singleCategory/ProductFilter";
import MobileFilterDrawer from "../singleCategory/MobileFilterDrawer";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

export default function CategoryProduct() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    brands: [],
    country: "",
    inStock: false,
    minPrice: "",
    maxPrice: "",
  });

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${SKINORA_API_URL}/api/products`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data.filter((p) => p.categorySlug === slug));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    setCurrentPage(1);
  }, [slug]);

  /* FILTER LOGIC */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.brands.length && !filters.brands.includes(p.brand))
        return false;
    // Country
    if (filters.country && p.country !== filters.country)
      return false;

      if (filters.inStock && p.stockStatus !== "IN_STOCK")
        return false;

      if (filters.minPrice && p.price < Number(filters.minPrice))
        return false;

      if (filters.maxPrice && p.price > Number(filters.maxPrice))
        return false;

      return true;
    });
  }, [products, filters]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <section className="my-10 flex gap-6">
      {/* DESKTOP FILTER */}
      <div className="hidden lg:block w-1/5">
        <ProductFilter filters={filters} setFilters={setFilters} hideCategory />
      </div>

      {/* PRODUCTS */}
      <div className="w-full lg:w-4/5">
        <Header
          Title={slug.replace("-", " ").toUpperCase()}
          discription="Premium Skincare And Beauty, Chosen Just For You"
        />

        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden flex justify-center px-3 mb-3 w-full">
          <button
            onClick={() => setOpenFilter(true)}
            className="px-4 py-2 border rounded-lg text-sm bg-primary hover:bg-secondary text-white font-medium w-full"
          >
            Filters
          </button>
        </div>

        {/* MOBILE FILTER DRAWER */}
        <MobileFilterDrawer
          isOpen={openFilter}
          onClose={() => setOpenFilter(false)}
          filters={filters}
          setFilters={setFilters}
          hideCategory
        />

        {/* COUNT */}
        <p className="text-gray-600 mx-2">
          Showing{" "}
          <span className="text-secondary">
            {startIndex + 1}–
            {Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)}
          </span>{" "}
          of{" "}
          <span className="text-secondary">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>

        {/* PRODUCTS GRID */}
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          {currentProducts.length ? (
            currentProducts.map((product) => (
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
            <p className="text-gray-500 mt-10">No products found</p>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-primary text-white rounded disabled:opacity-40"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full border ${
                  currentPage === i + 1
                    ? "bg-secondary text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-primary text-white rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
