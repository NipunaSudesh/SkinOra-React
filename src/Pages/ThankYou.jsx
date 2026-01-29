import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Thank You for Your Order!
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.  
          We’ll contact you soon with delivery details.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
}
