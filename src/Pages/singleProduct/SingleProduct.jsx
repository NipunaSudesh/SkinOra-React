import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;

export default function SingleProduct() {
const [product,setProduct] =useState(null);
const {slug} =useParams();
const fetchproduct = async ()=>{
try {
  const res =await fetch(`${SKINORA_API_URL}/api/products/slug/${slug}`);
  const data = await res.json();
    setProduct(data);
    console.log(data);
} catch (error) {
  console.log("error fetching single product",error);
}
}
 useEffect(()=>{
  fetchproduct()
},[slug]);
if (!product) return <p>Loading...</p>;
  return (
    <div className='flex flex-col md:flex-row gap-4 '>
      <div className='flex w-full md:w-1/2 '>
              <h1>{product.name}</h1>
      <p>{product.shortDescription}</p>
      <p>Rs. {product.price}</p>
      </div>
      <div  className='flex w-full md:w-1/2 '>

      </div>
    </div>
  )
}
