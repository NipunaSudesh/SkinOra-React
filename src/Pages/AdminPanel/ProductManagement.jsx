import React from 'react'
import AdminLayout from './AdminLayout'
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";
export const ProductManagement = () => {
  const [open, setOpen] = useState(false);
  return (
    <AdminLayout open={open} setOpen={setOpen}>
      <div className=" bg-[#f5f4f0]  flex flex-col gap-4">
<div className=" md:hidden">
  <button
    onClick={() => setOpen(true)}
    className="bg-white shadow-lg border w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition"
  >
    <Menu size={22} />
  </button>
</div>
      </div>
    </AdminLayout>
  )
}
