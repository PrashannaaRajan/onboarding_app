import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./api/routes/auth";
import onboardingRoutes from "./api/routes/onboarding";
import configRoutes from "./api/routes/config";
import dataRoutes from "./api/routes/data";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/admin", configRoutes);
app.use("/api", dataRoutes);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT);
