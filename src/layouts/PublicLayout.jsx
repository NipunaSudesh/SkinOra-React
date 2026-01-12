import React from "react";
import { Outlet } from "react-router-dom";

// layout components
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <>
      <NavBar />
      <main className="container-card mt-20 md:mt-32">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
