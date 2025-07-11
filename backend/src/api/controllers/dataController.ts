import { Request, Response } from "express";
import { fetchAllUsers } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
