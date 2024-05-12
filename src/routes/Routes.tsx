import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import { Navbar } from "../layout";

const MainRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
