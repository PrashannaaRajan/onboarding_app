import { Request, Response } from "express";
import pool from "../db";

export const getConfig = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT component, section FROM config");
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting config:", err);
    res.status(500).json({ error: "Failed to get config" });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  const configUpdates: { component: string; section: number }[] = req.body;

  try {
    await pool.query("BEGIN");

    for (const item of configUpdates) {
      await pool.query(`UPDATE config SET section = $1 WHERE component = $2`, [
        item.section,
        item.component,
      ]);
    }

    await pool.query("COMMIT");
    res.status(200).json({ success: true });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error updating config:", err);
    res.status(500).json({ error: "Failed to update config" });
  }
};
