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
import About  from "./Pages/About";
import Contact  from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Team from "./Pages/Terms";

function App() {
  return (
    <>
    <HeartCursor />
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/all-categories" element={<AllCategories />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/all-products" element={<AllProducts />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/product-category/:slug" element={<CategoryPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/product/slug/:slug" element={<SingleProductPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/cart" element={<AddToCart />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/checkout" element={<AddToCart />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route >
          <Route path="/register" element={<Register />} />
        </Route>
          <Route element={<PublicLayout />}>
        <Route path="/about" element={<About />} />
        </Route>
          <Route element={<PublicLayout />}>
          <Route path="/contact" element={<Contact />} />
        </Route>
                  <Route element={<PublicLayout />}>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
        
          <Route element={<PublicLayout />}>
          <Route path="/terms" element={<Team />} />
        </Route>

      </Routes>
    </Router>
    </>
  );
}

export default App;
