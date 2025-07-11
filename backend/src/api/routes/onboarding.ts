import express from "express";
import { authenticate } from "../middleware/authenticate";
import { saveOnboardingData } from "../controllers/onboardingController";

const router = express.Router();

router.post("/section/:section", authenticate, saveOnboardingData);

export default router;
