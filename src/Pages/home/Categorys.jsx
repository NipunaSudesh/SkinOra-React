import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../components/theme/Header";

import CategoryCard from "../../components/card/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

// const categories = [
//   {
//     id: 1,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030903/toiletries_yruvh2.webp",
//     category: "Toiletries",
//     slug: "toiletries",
//     description:
//       "Keep your skin fresh with authentic makeup removers and cleansing wipes from Neutrogena and Avene.",
//   },
//   {
//     id: 2,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030902/body_care_lpdupi.webp",
//     category: "Body Care",
//     slug: "body-care",
//     description:
//       "Premium body lotions and moisturizers perfect for Sri Lanka's tropical climate.",
//   },
//   {
//     id: 3,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030902/wellness_bundles_zwsha7.webp",
//     category: "Wellness Bundles",
//     slug: "wellness-bundles",
//     description:
//       "Exclusive product bundles from trusted skincare brands at special prices.",
//   },
//   {
//     id: 4,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030890/sunscreens_si0ymx.webp",
//     category: "Sunscreens",
//     slug: "sunscreens",
//     description:
//       "Broad-spectrum SPF protection for intense tropical sun exposure.",
//   },
//   {
//     id: 5,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030888/Facecare_jjtyom.webp",
//     category: "Face Care",
//     slug: "face-care",
//     description:
//       "Cleansers, serums, and treatments for all skin types and concerns.",
//   },
//   {
//     id: 6,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030880/haircare_wv1qwk.webp",
//     category: "Hair Care",
//     slug: "hair-care",
//     description:
//       "Solutions for frizz control, hair fall, and damage repair.",
//   },
//   {
//     id: 7,
//     img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030859/baby_proucts_g7tyt1.webp",
//     category: "Baby Products",
//     slug: "baby-products",
//     description:
//       "Gentle and safe baby care essentials with guaranteed authenticity.",
//   },
// ];

export default function Categories() {
  const swiperRef = useRef(null);
  const [categories,setCategories]=useState([]);
const fetchCategories = async () => {
  try {
const res = await fetch(`${SKINORA_API_URL}/api/getcategories`);
    // const res = await fetch("http://localhost:5000/api/getcategories");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    setCategories(data);
    console.log("Categories data:", data);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

  useEffect((() => {
    fetchCategories();
  }), []);

  return (
    <div className="container-card mt-10 relative">
      {/* Header */}
      <Header
        Title="Shop by Categories"
        discription="Explore our curated selection of beauty categories tailored to your needs."
      />

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mt-8"
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center ">
            <CategoryCard
              img={item.imageUrl}
              category={item.categoriesName}
              description={item.description}
              slug={item.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
<div className="mt-4 flex items-center justify-center">
      <button className="bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition duration-200">View All Categories</button>
</div>
      {/* ⬅ Prev */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-secondary p-2 rounded-full shadow transition"
      >
        <FiChevronLeft size={22} />
      </button>

      {/* ➡ Next */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-secondary p-2 rounded-full shadow transition"
      >
        <FiChevronRight size={22} />
      </button>

    </div>
  );
}
