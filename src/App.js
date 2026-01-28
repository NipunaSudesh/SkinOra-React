import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./Components/layout/PublicLayout";
import HeartCursor from "./Components/layout/HeartCursor";
import Home from "./Pages/home/Home";
import AllCategories from "./Pages/AllCategories";
import CategoryPage from "./Pages/singleCategory/CategoryPage";
import AllProducts from "./Pages/AllProducts";
import SingleProductPage from "./Pages/singleProduct/SingleProduct";
import AddToCart from "./Pages/AddToCart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Team from "./Pages/Terms";

function App() {
  return (
    <>
      <HeartCursor />

      <Router>
        <Routes>

          {/* PUBLIC LAYOUT */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-categories" element={<AllCategories />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product-category/:slug" element={<CategoryPage />} />
            <Route path="/product/slug/:slug" element={<SingleProductPage />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/checkout" element={<AddToCart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Team />} />
          </Route>

          {/* AUTH ROUTES (NO LAYOUT) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
