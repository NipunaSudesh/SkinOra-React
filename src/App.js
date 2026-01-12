import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./Pages/home/Home";
import AllCategories from "./Pages/AllCategories";
import CategoryPage from "./Pages/singleCategory/CategoryPage";
import AllProducts from "./Pages/AllProducts";

function App() {
  return (
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

      </Routes>
    </Router>
  );
}

export default App;
