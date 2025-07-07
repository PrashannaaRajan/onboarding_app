import { Request, Response } from "express";
import pool from "../db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, email, section, about_me, birthdate, street, city, state, zip, created_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
