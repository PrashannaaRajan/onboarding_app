import { useState } from "react";
import { Container, Typography, Button, Box, Alert } from "@mui/material";
import AddressFields from "../components/AddressFields";
import BirthdateField from "../components/BirthdateField";
import AboutMeField from "../components/AboutMeField";
import type { ComponentConfig } from "../types/config";
import { submitSectionData } from "../services/onboarding";
import { useNavigate } from "react-router-dom";
import { validateSectionForm } from "../utils/validateSectionForm";

const SectionRenderer = ({ section }: { section: number }) => {
  const navigate = useNavigate();
  const config: ComponentConfig[] = JSON.parse(
    sessionStorage.getItem("config") || "[]"
  );
  const lastSection = JSON.parse(sessionStorage.getItem("sectionCount") || "1");
  const components = config
    .filter((c) => c.section === section)
    .map((c) => c.component);
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const validationError = validateSectionForm(components, formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await submitSectionData(section, formData, token!);
      if (section === lastSection) {
        alert("All sections completed! Redirecting to data page.");
        sessionStorage.removeItem("token");
        navigate("/data");
      } else {
        sessionStorage.setItem("currentSection", (section + 1).toString());
        setError("");
        navigate(`/section-${section + 1}`);
      }
    } catch (err) {
      setError("Failed to submit data");
    }
  };

  const handleBackBtn = () => {
    if (section == 1) {
      sessionStorage.removeItem("token");
      navigate("/");
      return;
    }
    sessionStorage.setItem("currentSection", (section - 1).toString());
    navigate(`/section-${section - 1}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Button variant="outlined" onClick={handleBackBtn} sx={{ mb: 3 }}>
        {section == 1 ? "Logout" : "Back"}
      </Button>
      <Typography variant="h4" gutterBottom>
        Section {section}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box mt={3} display="flex" flexDirection="column" gap={3}>
        {components.includes("address") && (
          <AddressFields formData={formData} onChange={handleChange} />
        )}
        {components.includes("birthdate") && (
          <BirthdateField
            value={formData.birthdate || ""}
            onChange={handleChange}
          />
        )}
        {components.includes("about_me") && (
          <AboutMeField
            value={formData.about_me || ""}
            onChange={handleChange}
          />
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "30%", alignSelf: "center" }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default SectionRenderer;
