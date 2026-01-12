import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import PublicLayout from "./layouts/PublicLayout";
import Home from "./Pages/home/Home";
import AllCategories from "./Pages/AllCategories";

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
{/* <Routes>
  <Route path="/category/:slug" element={<CategoryPage />} />
</Routes> */}

      </Routes>
    </Router>
  );
}

export default App;
