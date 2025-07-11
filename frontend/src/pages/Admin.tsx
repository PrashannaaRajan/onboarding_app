import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Select,
  MenuItem,
  FormControl,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ComponentConfig } from "../types/config";
import {
  fetchComponentConfig,
  updateComponentConfig,
} from "../services/config";

const Admin = () => {
  const [config, setConfig] = useState<ComponentConfig[]>([]);
  const [isEdited, setIsEdited] = useState(false);
  const [numSections, setNumSections] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchComponentConfig()
      .then((res) => {
        setConfig(res);
        const maxSection = Math.max(...res.map((c: ComponentConfig) => c.section));
        setNumSections(maxSection);
      })
      .catch(() => setError("Failed to load config"));
  }, []);

  const handleChange = (index: number, newSection: number) => {
    const updatedConfig = [...config];
    updatedConfig[index] = { ...updatedConfig[index], section: newSection };
    setConfig(updatedConfig);
  };

  const handleNumSectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  const value = Number(e.target.value);
  if (isNaN(value) || value < 1) {
    return;
    }
  const updatedConfig = config.map((item) =>
    item.section > value ? { ...item, section: value } : item
  );

  setConfig(updatedConfig);
  setNumSections(value);
  setError("");
};

  const handleNumSectionBlur = (e: { target: { value: string; }; }) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1 || value > config.length) {
      setError("Number of sections must be between 1 and " + config.length);
      setNumSections(config.length);
      setMessage("");
    } else {
      const updatedConfig = config.map((item) =>
    item.section > value ? { ...item, section: value } : item
  );

  setConfig(updatedConfig);
  setNumSections(value);
      setError("");
    }
  };
  const handleSubmit = async () => {
    const sectionMap: Record<number, number> = {};

    config.forEach((item) => {
      if (item.section <= numSections) {
        sectionMap[item.section] = (sectionMap[item.section] || 0) + 1;
      }
    });

    const allSectionsCovered = Array.from({ length: numSections }, (_, i) =>
      i + 1
    ).every((s) => sectionMap[s] > 0);

    if (!allSectionsCovered) {
      setError("Each section must have at least one component.");
      setMessage("");
      return;
    }

    try {
      await updateComponentConfig(config);
      setIsEdited(true);
      setMessage("Configuration updated successfully");
      setError("");
    } catch (err) {
      setError("Failed to update config");
      setMessage("");
    }
  };

  const handleBackBtn = () => {
    navigate("/");
    isEdited && window.location.reload(); // Reload to apply changes
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Button variant="outlined" sx={{ mt: 4, mb: 4 }} onClick={handleBackBtn}>
        Back to Login
      </Button>
      <Typography variant="h4" gutterBottom>
        Admin Configuration
      </Typography>

      <TextField

        label="Number of Sections"
        type="number"
        value={numSections}
        onChange={handleNumSectionsChange}
        fullWidth
        sx={{ mb: 3, width: '20%'}}
        inputProps={{ min: 1  }}
        onBlur={handleNumSectionBlur}
      />

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Assigned Section</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {config.map((item, index) => (
              <TableRow key={item.component}>
                <TableCell>{item.component}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={item.section}
                      onChange={(e) => handleChange(index, Number(e.target.value))}
                    >
                      {Array.from({ length: numSections }, (_, i) => i + 1).map((s) => (
                        <MenuItem key={s} value={s}>
                          Section {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default Admin;
