import React, { useEffect, useState } from 'react'
import Features from "../Pages/home/Features";
import { banner } from '../assets/images';
import { Header } from '../components/theme/Header';
import ProductCard from '../components/card/ProductCard';
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

export default function AllProducts() {
    const [products,setProducts] =useState([]);
  const [currentPage, setCurrentPage] = useState(1);

const fetchProducts =async () =>{
    try{
        const res =await fetch(`${SKINORA_API_URL}/api/getproducts`);
        const data =await res.json();
        setProducts(data);  
    }catch(error){
        console.error("Error fetching products:", error);
    }
}
useEffect(()=>{
    fetchProducts();
    setCurrentPage(1);
},[]);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
        <>
          <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <div
              className="relative py-20 bg-cover bg-center bg-no-repeat h-96"
              style={{ backgroundImage: `url(${banner})` }}
            >
              {/* overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
      
              {/* content */}
              <div className="relative container-card text-start">
                <h2 className="text-lg text-white tracking-wide">
                  All Products
                </h2>
      
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
             Premium Skincare & Beauty
                </h1>
      
                <p className="text-white mt-1 max-w-xl">
             Explore our complete collection of authentic skincare, haircare,
        baby care, and wellness products—carefully selected just for you.
                </p>
              </div>
            </div>
          </section>
      <Features />
<section className=" my-10">
    <div className='flex flex-col gap-4'>
    <Header
  Title="All Products"
  discription="Shop our full range of trusted skincare, haircare, baby care, and wellness products."
/>
<div className='flex flex-wrap gap-4 justify-center mt-8'>
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
{totalPages > 1 && (
    <div className="flex items-center gap-2 mt-10 justify-center">
        <button
        onClick={()=>setCurrentPage((p)=>Math.max(p-1,1))}
                disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-40  text-white bg-primary hover:bg-secondary min-w-[90px]"
          >Previous</button>
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
        <button
        onClick={()=>setCurrentPage((p)=>Math.max(p+1,totalPages))}
                disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-40  text-white bg-primary hover:bg-secondary  min-w-[90px]"
          >Next</button>
          
      </div>
)}
    </div>
    </section>
        </>
  )
}

