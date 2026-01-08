import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import PublicLayout from "./layouts/PublicLayout";
import Home from "./Pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
