import React, { useEffect, useMemo, useState } from "react";
import Features from "../Pages/home/Features";
import { banner } from "../assets/images";
import { Header } from "../components/theme/Header";
import ProductCard from "../components/card/ProductCard";
import ProductFilter from "./singleCategory/ProductFilter";
import MobileFilterBar from "./singleCategory/MobileFilterDrawer";
import MobileFilterDrawer from "./singleCategory/MobileFilterDrawer";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brands: [],
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
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* FILTER LOGIC */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (filters.category && p.categorySlug !== filters.category) return false;
   if (filters.country && p.country !== filters.country) return false;
      // Brands (multi-select)
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(p.brand)
      )
        return false;

      // Availability
      if (filters.inStock && p.stockStatus !== "IN_STOCK") return false;

      // Min Price
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;

      // Max Price
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;

      return true;
    });
  }, [products, filters]);

  /* PAGINATION AFTER FILTER */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  /* RESET PAGE WHEN FILTER CHANGES */
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      {/* Banner */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div
          className="relative py-20 bg-cover bg-center bg-no-repeat h-96"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative container-card">
            <h2 className="text-lg text-white">All Products</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Premium Skincare & Beauty
            </h1>
            <p className="text-white mt-1 max-w-xl">
              Explore our complete collection of authentic skincare, haircare,
              baby care, and wellness products.
            </p>
          </div>
        </div>
      </section>

      <Features />

      {/* Layout */}
      <section className="my-10 flex gap-6">
        {/* Filters */}
   <div className="hidden lg:block w-1/5">
    <ProductFilter filters={filters} setFilters={setFilters} />
  </div>

  {/* Products */}
  <div className="w-full lg:w-4/5">


        {/* Products */}
        {/* <div className="w-4/5 flex flex-col gap-4"> */}
          <Header
            Title="All Products"
            discription="Shop our full range of trusted skincare, haircare, baby care, and wellness products."
          />
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
        />

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
    {/* Mobile horizontal filter */}
    {/* <MobileFilterBar filters={filters} setFilters={setFilters} /> */}
          <div className="flex flex-wrap justify-center mt-6 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard
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

          {/* Pagination */}
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
    </>
  );
}
