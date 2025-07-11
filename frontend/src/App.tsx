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
import NotFound from "./components/NotFound";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sectionCount = useSelector((state: RootState) => state.admin.sectionCount);

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);


  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/data" element={<Data />} />

      <Route path="/" element={<Onboarding />}>
        <Route index element={<Login />} />
        {Array.from({ length: sectionCount }, (_, i) => i + 1).map((section) => (
          <Route
            key={section}
            path={`section-${section}`}
            element={<SectionRenderer section={section} />}
          />
        ))}
      </Route>
       <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
