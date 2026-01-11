import React from 'react'
import { Header } from "../../components/theme/Header";
import ProductCard from '../../components/card/ProductCard';
const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
// import axios from "axios";

export default function Products() {
  return (
      <div className="container-card mt-10 relative">
          {/* Header */}
          <Header
            Title="Featured Products"
            discription="Premium Skincare And Beauty, Chosen Just For You"
          />
          <div className='flex gap-4 mt-8 justify-center flex-wrap'>
            <ProductCard />
            <ProductCard />
          </div>
          </div>
  )
}
