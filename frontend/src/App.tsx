import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
import Login from "./pages/Login";
import SectionRenderer from "./pages/SectionRenderer";
import { fetchConfig } from "./slices/configSlice";
import type { RootState, AppDispatch } from "./store";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector((state: RootState) => state.admin.config);

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  const sections = [...new Set(config.map((c) => c.section))];

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
