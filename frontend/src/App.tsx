import { useState, useEffect } from "react";
import { fetchComponentConfig } from "./services/config";
import { Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
import Login from "./pages/Login";
import SectionRenderer from "./pages/SectionRenderer";

const App = () => {
  const [sections, setSections] = useState<number[]>([]);

  useEffect(() => {
    fetchComponentConfig().then((config) => {
      sessionStorage.setItem("config", JSON.stringify(config));
      const sections = [...new Set(config.map((c) => c.section))];
      const lastSection = Math.max(...config.map((c) => c.section));
      sessionStorage.setItem("sectionCount", lastSection.toString());
      setSections(sections);
    });
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/data" element={<Data />} />

      <Route path="/" element={<Onboarding sections={sections} />}>
        <Route index element={<Login />} />
        {sections.map((section) => (
          <Route
            key={section}
            path={`section-${section}`}
            element={<SectionRenderer section={section} />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
