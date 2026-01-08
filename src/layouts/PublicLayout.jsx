import React from "react";
import { Outlet } from "react-router-dom";

// layout components
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <>
      <NavBar />
      <main className="container-card">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
