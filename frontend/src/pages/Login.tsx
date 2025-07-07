import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const section = sessionStorage.getItem("section");

  useEffect(() => {
    if (token && section) {
      if (section === "1") navigate("/section-1");
      else if (section === "2") navigate("/section-2");
    }
  }, []);

  const validate = () => {
    const errors: typeof fieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const { token, section } = await login(email, password);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("section", section);

      if (section === 1) navigate("/section-1");
      else if (section === 2) navigate("/section-2");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
          Welcome to Onboarding
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Continue
          </Button>
        </Box>
      </Paper>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 4 }}
        onClick={() => navigate("/admin")}
      >
        Go to Admin
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/data")}
      >
        Go to Data
      </Button>
    </Container>
  );
};

export default Login;
