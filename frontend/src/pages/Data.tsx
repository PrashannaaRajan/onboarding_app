import { useEffect, useState } from "react";
import axios from "axios";
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
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/data";
import type { User } from "../types/user";

const Data = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserData()
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to fetch user data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 6 }}>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={() => navigate("/")}>
        Back to Login
      </Button>
      <Typography variant="h4" gutterBottom>
        User Data
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && users.length === 0 && (
        <Typography>No data available.</Typography>
      )}

      {!loading && users.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>About Me</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.about_me || "-"}</TableCell>
                  <TableCell>{user.birthdate || "-"}</TableCell>
                  <TableCell>{user.street || "-"}</TableCell>
                  <TableCell>{user.city || "-"}</TableCell>
                  <TableCell>{user.state || "-"}</TableCell>
                  <TableCell>{user.zip || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Data;
