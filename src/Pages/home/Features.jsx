import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";


export default function Features() {
  return (
    <div className="container-card mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Feature 1 */}
        <div className="flex gap-3 p-4 border rounded-lg items-center bg-white">
          <TbTruckDelivery className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
            <p className="text-sm text-gray-500">Island-wide next-day delivery</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex gap-3 p-4 border rounded-lg items-center bg-white">
          <MdVerifiedUser className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-800">100% Authentic</h3>
            <p className="text-sm text-gray-500">Dermatologist approved products</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex gap-3 p-4 border rounded-lg items-center bg-white">
          <FaLeaf className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-800">Natural Ingredients</h3>
            <p className="text-sm text-gray-500">Safe & skin-friendly formulas</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex gap-3 p-4 border rounded-lg items-center bg-white">
          <RiCustomerService2Line className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-800">Expert Support</h3>
            <p className="text-sm text-gray-500">Beauty advice when you need it</p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex gap-3 p-4 border rounded-lg items-center bg-white">
          <GiReceiveMoney className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-semibold text-gray-800">Easy Payments</h3>
            <p className="text-sm text-gray-500">Cash on delivery & cards</p>
          </div>
        </div>

      </div>
    </div>
  );
}
