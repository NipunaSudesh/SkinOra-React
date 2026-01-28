import React, { useEffect, useState } from 'react'
import { Header } from '../Components/theme/Header';
import CategoryCart from "../Components/cartTemplate/CategoryCart";
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function AllCategories() {
  const [categories,setCategories] = useState([]);

  const fetchCategories =async () =>{
    try {
      const res =await fetch(`${SKINORA_API_URL}/api/categories`);
      if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data =await res.json();
      setCategories(data);
      console.log("Categories data:",data);
    }catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  }
useEffect (()=>{
  fetchCategories();
},[]);

  return (
    <div className='flex flex-col item-center justify-center gap-4 card-container px-4'>
      <div>
              <Header
                Title="Shop by Categories"
                discription="Explore our curated selection of beauty categories tailored to your needs."
              />
      </div>
      <div className='flex flex-wrap justify-center items-center gap-4 w-full '>
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full '> */}
        {categories.map((category) => (
          <CategoryCart key={category.id}
           category={category.categoriesName}
            description={category.description}
           img={category.imageUrl}
           slug={category.slug}
            />
        ))}
      </div>
    </div>
  )
}
