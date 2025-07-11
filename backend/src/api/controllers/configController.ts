import { Request, Response } from "express";
import { fetchConfig, updateConfigSection } from "../services/configService";
import Config from "../models/configModel";

export const getConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: Config[] = await fetchConfig();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get config" });
  }
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
  const configUpdates: Config[] = req.body;
  try {
    await updateConfigSection(configUpdates);
    res.status(200).json();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
