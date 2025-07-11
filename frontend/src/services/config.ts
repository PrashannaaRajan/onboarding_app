import axios from "axios";
import type { ComponentConfig } from "../types/config";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchComponentConfig = async (): Promise<ComponentConfig[]> => {
  const response = await axios.get<ComponentConfig[]>(
    `${BASE_URL}/api/admin/config`
  );
  return response.data;
};

export const updateComponentConfig = async (
  updatedConfig: ComponentConfig[]
): Promise<{ success: boolean }> => {
  const response = await axios.put<{ success: boolean }>(
    `${BASE_URL}/api/admin/config`,
    updatedConfig
  );
  return response.data;
};
