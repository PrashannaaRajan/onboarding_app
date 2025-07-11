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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchConfig, updateConfigThunk } from "../slices/configSlice";
import type { ComponentConfig } from "../types/config";

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector((state: RootState) => state.admin.config);
  const [localConfig, setLocalConfig] = useState<ComponentConfig[]>([]);
  const [numSections, setNumSections] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  useEffect(() => {
    if (config.length > 0) {
      setLocalConfig(config);
      const maxSection = Math.max(...config.map((c) => c.section));
      setNumSections(maxSection);
    }
  }, [config]);

  const handleChange = (index: number, newSection: number) => {
    const updated = [...localConfig];
    updated[index] = { ...updated[index], section: newSection };
    setLocalConfig(updated);
    setIsEdited(true);
  };

  const handleNumSectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 1) return;

    const updated = localConfig.map((item) =>
      item.section > value ? { ...item, section: value } : item
    );
    setLocalConfig(updated);
    setNumSections(value);
    setError("");
  };

  const handleNumSectionBlur = () => {
    if (numSections > localConfig.length) {
      setError(
        "Number of sections must be between 1 and " + localConfig.length
      );
      setNumSections(localConfig.length);
      return;
    }
  };

  const handleSubmit = async () => {
    const sectionMap: Record<number, number> = {};
    localConfig.forEach((item) => {
      if (item.section <= numSections) {
        sectionMap[item.section] = (sectionMap[item.section] || 0) + 1;
      }
    });

    const allSectionsCovered = Array.from(
      { length: numSections },
      (_, i) => i + 1
    ).every((s) => sectionMap[s] > 0);

    if (!allSectionsCovered) {
      setError("Each section must have at least one component.");
      setMessage("");
      return;
    }

    try {
      await dispatch(updateConfigThunk(localConfig));
      setMessage("Configuration updated successfully");
      setError("");
    } catch {
      setError("Failed to update config");
      setMessage("");
    }
  };

  const handleBackBtn = () => {
    navigate("/");
    if (isEdited) window.location.reload();
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
        onBlur={handleNumSectionBlur}
        fullWidth
        sx={{ mb: 3, width: "20%" }}
        inputProps={{ min: 1 }}
      />

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Assigned Section</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localConfig.map((item, index) => (
              <TableRow key={item.component}>
                <TableCell>{item.component}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={item.section}
                      onChange={(e) =>
                        handleChange(index, Number(e.target.value))
                      }
                    >
                      {Array.from({ length: numSections }, (_, i) => i + 1).map(
                        (s) => (
                          <MenuItem key={s} value={s}>
                            Section {s}
                          </MenuItem>
                        )
                      )}
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
