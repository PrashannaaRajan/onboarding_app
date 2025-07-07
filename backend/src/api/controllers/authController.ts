import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

export const handleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
  }

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(userQuery, [email]);
    const user = rows[0];

    if (user) {
      if (user.section === 3) {
        res
          .status(400)
          .json({ error: "You have already completed onboarding" });
      }
      // User exists - login
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        userId: user.id,
        section: user.section,
      });
    } else {
      // User doesn't exist - register
      const hashed = await bcrypt.hash(password, 10);
      const insertQuery = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, section`;
      const insertRes = await pool.query(insertQuery, [email, hashed]);
      const newUser = insertRes.rows[0];

      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        token,
        section: newUser.section,
      });
    }
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
