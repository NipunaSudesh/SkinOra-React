import React from 'react'
import Features from "../Pages/home/Features";
import { banner } from '../assets/images';
import { Header } from '../components/theme/Header';


export default function AllProducts() {
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

    </div>
    </section>
        </>
  )
}

