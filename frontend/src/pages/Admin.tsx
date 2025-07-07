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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ComponentConfig } from "../types/config";
import {
  fetchComponentConfig,
  updateComponentConfig,
} from "../services/config";

const Admin = () => {
  const [config, setConfig] = useState<ComponentConfig[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchComponentConfig()
      .then((res) => {
        const data = res.data;
        setConfig(data);
      })
      .catch(() => setError("Failed to load config"));
  }, []);

  const handleChange = (index: number, newSection: number) => {
    const updatedConfig = [...config];
    updatedConfig[index] = { ...updatedConfig[index], section: newSection };
    setConfig(updatedConfig);
  };

  const handleSubmit = async () => {
    const sectionCounts = config.reduce(
      (counts, item) => {
        if (item.section === 1) counts.section1 += 1;
        if (item.section === 2) counts.section2 += 1;
        return counts;
      },
      { section1: 0, section2: 0 }
    );

    if (sectionCounts.section1 === 0 || sectionCounts.section2 === 0) {
      setError("Each section must have at least one component.");
      setMessage("");
      return;
    }

    try {
      updateComponentConfig(config);
      setMessage("Configuration updated successfully");
      setError("");
    } catch (err) {
      setError("Failed to update config");
      setMessage("");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Button
        variant="outlined"
        sx={{ mt: 4, mb: 4 }}
        onClick={() => navigate("/")}
      >
        Back to Login
      </Button>
      <Typography variant="h4" gutterBottom>
        Admin Configuration
      </Typography>

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
                      onChange={(e) =>
                        handleChange(index, e.target.value as number)
                      }
                    >
                      <MenuItem value={1}>Section 1</MenuItem>
                      <MenuItem value={2}>Section 2</MenuItem>
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
