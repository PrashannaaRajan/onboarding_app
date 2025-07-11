import express from "express";
import { getAllUsers } from "../controllers/dataController";

const router = express.Router();

router.get("/data", getAllUsers);

export default router;
