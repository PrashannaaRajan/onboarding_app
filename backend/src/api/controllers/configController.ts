import { Request, Response } from "express";
import { fetchConfig, updateConfigSection } from "../services/configService";

export const getConfig = async (req: Request, res: Response) => {
  try {
    const result = await fetchConfig();
    res.json(result);
  } catch (err) {
    console.error("Error getting config:", err);
    res.status(500).json({ error: "Failed to get config" });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  const configUpdates: { component: string; section: number }[] = req.body;
  try {
    await updateConfigSection(configUpdates);
    res.json({ success: true });
  }
  catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
