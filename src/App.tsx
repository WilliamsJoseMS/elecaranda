import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Basics from "./pages/Basics";
import Conductors from "./pages/Conductors";
import Symbology from "./pages/Symbology";
import Documentation from "./pages/Documentation";
import Provisioning from "./pages/Provisioning";
import Planning from "./pages/Planning";
import Instruments from "./pages/Instruments";
import Testing from "./pages/Testing";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basics" element={<Basics />} />
          <Route path="conductors" element={<Conductors />} />
          <Route path="symbology" element={<Symbology />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="provisioning" element={<Provisioning />} />
          <Route path="planning" element={<Planning />} />
          <Route path="instruments" element={<Instruments />} />
          <Route path="testing" element={<Testing />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </Router>
  );
}
