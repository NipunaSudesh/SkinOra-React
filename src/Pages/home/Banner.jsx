import React, { useRef } from "react";
import { banner1, banner2, banner3, banner4,banner5 } from "../../assets/images";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

// const banners = [
//   { id: 1, img: banner1, alt: "Skinora Banner 1" },
//   { id: 2, img: banner2, alt: "Skinora Banner 2" },
//     { id: 3, img: banner5, alt: "Skinora Banner 5" },
//   { id: 4, img: banner3, alt: "Skinora Banner 3" },
//   { id: 5, img: banner4, alt: "Skinora Banner 4" },
// ];
const banners = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030840/banner1_chrf63.webp",
    alt: "Skinora Banner 1",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030901/banner2_i8uzij.webp",
    alt: "Skinora Banner 2",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030899/banner5_rbr6wz.png",
    alt: "Skinora Banner 5",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030856/banner3_q1m4ce.webp",
    alt: "Skinora Banner 3",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/dahofpwrr/image/upload/v1768030852/banner4_cvbmlo.webp",
    alt: "Skinora Banner 4",
  },
];


export default function Banner() {
  const swiperRef = useRef(null);

  return (
    <div className="mt-20 lg:mt-32 relative">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="w-full rounded-lg shadow-lg"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-[100px] sm:h-[200px] md:h-[240px] lg:h-[400px] object-cover rounded-lg "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ⬅ Previous Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-secondary text-gray-800 p-2 rounded-full shadow transition
        "
      >
        <FiChevronLeft size={22} />
      </button>

      {/* ➡ Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          z-10 bg-white/80 hover:bg-secondary text-gray-800 p-2 rounded-full shadow transition"
      >
        <FiChevronRight size={22} />
      </button>
    </div>
  );
}
