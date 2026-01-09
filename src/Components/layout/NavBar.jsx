import React from "react";
import TNavBar from "./TNavBar";
import BNavBar from "./BNavBar";

export default function NavBar() {
  return (
    <>
      {/* Top Navbar (Fixed) */}
      <TNavBar />

      {/* Bottom Navbar (Fixed) */}
      <BNavBar />
    </>
  );
}
