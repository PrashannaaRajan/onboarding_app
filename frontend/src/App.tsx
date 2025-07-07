import { Routes, Route } from "react-router-dom";
import Section1 from "./pages/Section1";
import Section2 from "./pages/Section2";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
import Onboarding from "./components/Onboarding";

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/data" element={<Data />} />

      <Route path="/" element={<Onboarding />}>
        <Route index element={<Login />} />
        <Route path="section-1" element={<Section1 />} />
        <Route path="section-2" element={<Section2 />} />
      </Route>
    </Routes>
  );
};

export default App;
