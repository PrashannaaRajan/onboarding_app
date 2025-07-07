import { Request, Response } from "express";
import pool from "../db";

export const saveOnboardingData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).userId;
  const section = parseInt(req.params.section, 10);
  const body = req.body;

  if (![1, 2].includes(section)) {
    res.status(400).json({ error: "Invalid onboarding section" });
  }

  try {
    // Get allowed components for this section from config
    const configQuery = `SELECT component FROM config WHERE section = $1`;
    const configRes = await pool.query(configQuery, [section]);
    const allowedComponents = configRes.rows.map((row) => row.component);

    // Prepare update object based on allowed fields
    const updates: Record<string, any> = {};
    if (allowedComponents.includes("about_me") && body.about_me) {
      updates.about_me = body.about_me;
    }
    if (allowedComponents.includes("birthdate") && body.birthdate) {
      updates.birthdate = body.birthdate;
    }
    if (allowedComponents.includes("address")) {
      const { street, city, state, zip } = body;
      if (street) updates.street = street;
      if (city) updates.city = city;
      if (state) updates.state = state;
      if (zip) updates.zip = zip;
    }

    const keys = Object.keys(updates);
    if (keys.length === 0) {
      res.status(400).json({ error: "No valid fields submitted" });
    }

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = Object.values(updates);

    const updateQuery = `UPDATE users SET ${setClause}, section = $${
      keys.length + 1
    } WHERE id = $${keys.length + 2}`;
    values.push(section + 1);
    values.push(userId);

    await pool.query(updateQuery, values);

    res.status(200).json({ success: true, updated: keys });
  } catch (err) {
    console.error("Onboarding update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
