import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

        {/* ERROR CODE */}
        <h1 className="text-7xl font-extrabold text-primary mb-2">
          404
        </h1>

        {/* MESSAGE */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition hover:border-primary"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg hover:opacity-90 hover:bg-secondary transition"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>

      </div>
    </div>
  );
}
