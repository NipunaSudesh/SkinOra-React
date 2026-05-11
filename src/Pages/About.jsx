import React from "react";
import Contact from "./Contact";
import { banner } from "../../src/assets/images";
import Features from "./home/Features";
import CustomerTestimonials from "./home/CustomerTestimonials";

export default function About() {
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
    
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2"> About SkinOra </h1>
    
        <p className="text-gray-300 leading-relaxed mb-1 mt-4">
          <strong>SkinOra</strong> is an online skincare and beauty platform
          designed to bring you high-quality products at affordable prices.
          Our goal is to make skincare simple, effective, and accessible to
          everyone.  </p>

        <p className="text-gray-300 leading-relaxed mb-1">
          We carefully curate products from trusted brands and ensure
          authenticity, safety, and customer satisfaction. </p>

        <p className="text-gray-100 leading-relaxed">
          Whether you are looking for daily skincare essentials or premium
          beauty products, SkinOra is here to help you glow with confidence ✨   </p>
            </div>
          </div>
        </section>
        <section >
        <Features />
    </section>
    <section >
        <div>
            <Contact />
        </div>
    </section>
        <section >
        <CustomerTestimonials />
    </section>
    </>
  );
}
