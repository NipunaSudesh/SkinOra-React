import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { banner } from "../../assets/images";

const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function Banner() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${SKINORA_API_URL}/api/categories`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const matchedCategory = data.find(
            (cat) => cat.slug === slug
          );
          setCategory(matchedCategory);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [slug]);

  return (
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
            Category
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {category?.categoriesName || "Loading..."}
          </h1>

          <p className="text-white mt-1 max-w-xl">
            {category?.longDescription ||
              "Discover premium skincare products selected just for you."}
          </p>
        </div>
      </div>
    </section>
  );
}
