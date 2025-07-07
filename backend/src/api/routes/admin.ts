import express from "express";
import { getConfig, updateConfig } from "../controllers/adminController";

const router = express.Router();

router.get("/config", getConfig);
router.put("/config", updateConfig);

export default router;
