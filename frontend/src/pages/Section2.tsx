import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateSectionForm } from "../utils/validateSectionForm";
import type { ComponentConfig, ComponentType } from "../types/config";
import type { FieldErrors, SectionForm } from "../types/sectionForm";
import { submitSectionData } from "../services/onboarding";
import { fetchComponentConfig } from "../services/config";

const Section2 = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<ComponentType[]>([]);
  const [formData, setFormData] = useState<SectionForm>({
    about_me: "",
    birthdate: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [error, setError] = useState<string>("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token == null) navigate("/");

    fetchComponentConfig()
      .then((res) => {
        const items: ComponentConfig[] = res.data;
        const section2Components: ComponentType[] = items
          .filter((item) => item.section === 2)
          .map((item) => item.component);
        setConfig(section2Components);
      })
      .catch(() => setError("Failed to load config"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const errors: FieldErrors = validateSectionForm(config, formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const payload: SectionForm = {};
    config.forEach((component) => {
      if (component === "address") {
        payload.street = formData.street;
        payload.city = formData.city;
        payload.state = formData.state;
        payload.zip = formData.zip;
      } else {
        payload[component] = formData[component];
      }
    });

    try {
      await submitSectionData(2, payload, token!);

      alert("Onboarding complete!");
      sessionStorage.removeItem("token");
      navigate("/data");
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Submission failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={4}>
        <Typography variant="h4" gutterBottom mb={4}>
          Section 2
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box display="flex" flexDirection="column" gap={4}>
          {config.includes("about_me") && (
            <TextField
              label="About Me"
              name="about_me"
              multiline
              minRows={4}
              value={formData.about_me}
              onChange={handleChange}
              fullWidth
              error={!!fieldErrors.about_me}
              helperText={fieldErrors.about_me}
            />
          )}

          {config.includes("birthdate") && (
            <TextField
              label="Birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!fieldErrors.birthdate}
              helperText={fieldErrors.birthdate}
            />
          )}

          {config.includes("address") && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    fullWidth
                    error={!!fieldErrors.street}
                    helperText={fieldErrors.street}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    error={!!fieldErrors.city}
                    helperText={fieldErrors.city}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                    error={!!fieldErrors.state}
                    helperText={fieldErrors.state}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    fullWidth
                    error={!!fieldErrors.zip}
                    helperText={fieldErrors.zip}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Finish
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Section2;
