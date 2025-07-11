import { Request, Response } from "express";
import { handleAuthService } from "../services/userService";

export const handleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: { email?: string; password?: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }

  try {
    const result = await handleAuthService(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    if (err.message === "completed") {
      res.status(400).json({ error: "You have already completed onboarding" });
    } else if (err.message === "invalid") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: "Server error, please try again" });
    }
  }
};
