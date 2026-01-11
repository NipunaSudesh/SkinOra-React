import React from "react";
import { FaStar } from "react-icons/fa";
import { Header } from "../../components/theme/Header";

const testimonials = [
  {
    title: "Express Delivery",
    message:
      "I placed my order easily and received it very fast. The products were excellent and well packed. Highly recommended!",
    name: "Sachini Kaushalya",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    title: "100% Original Products",
    message:
      "I have purchased several products and all of them were original with great results. Thank you for the trusted service.",
    name: "Samadhi Divyanjali",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    title: "High Quality Products",
    message:
      "The service level is outstanding and the product quality is amazing. I am very satisfied and will order again.",
    name: "Shabnam Roomy",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    title: "Best Customer Service",
    message:
      "Their customer support is very friendly and helpful. They always recommend the right products with great results.",
    name: "B G Ruvindya Rashmi",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

export default function CustomerTestimonials() {
  return (
     <section className="mt-10 bg-gray-200 py-4 rounded-2xl">
      <div className="container-card">

<Header
  Title="What Our Customers Say"
  discription="Real experiences from customers who trust SkinOra for premium skincare and beauty products."
/>


        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center ">
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mb-6 max-w-xs">
                {item.message}
              </p>

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />

              <p className="font-semibold text-sm tracking-wide mb-2 uppercase">
                {item.name}
              </p>

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
      {/* </div> */}
    </section>
  );
}
