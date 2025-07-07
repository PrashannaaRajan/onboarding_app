import express from "express";
import { handleAuth } from "../controllers/authController";

const router = express.Router();

router.post("/", handleAuth);

export default router;
