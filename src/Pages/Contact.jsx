import React, { useState } from "react";
import { contactUs } from "../assets/images";

export default function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thank you for contacting us! We’ll get back to you soon 😊");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen  mt-10 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* IMAGE */}
        <div className="hidden lg:flex justify-center">
          <img
            src={contactUs}
            alt="Contact Us"
            className="w-full max-w-lg object-contain rounded-lg "
          />
        </div>

        {/* FORM */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border-primary border ">
            <h1 className="text-2xl font-bold text-primary mb-4 text-center">
              Contact Us
            </h1>

            {/* Message */}
            {message && (
              <div className="mb-4 text-center text-green-600 font-medium">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-gray-700">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
              >
                Send Message
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Email: support@skinora.com</p>
              <p>Phone: +94 77 123 4567</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
