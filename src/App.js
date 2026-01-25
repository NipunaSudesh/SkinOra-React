import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HeartCursor from "./layouts/HeartCursor";
import Home from "./Pages/home/Home";
import AllCategories from "./Pages/AllCategories";
import CategoryPage from "./Pages/singleCategory/CategoryPage";
import AllProducts from "./Pages/AllProducts";
import SingleProductPage from "./Pages/singleProduct/SingleProduct";
import AddToCart from "./Pages/AddToCart";

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

      </Routes>
    </Router>
    </>
  );
}

export default App;
