import axios, { type AxiosResponse } from "axios";
import type { ComponentConfig } from "../types/config";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchComponentConfig = async (): Promise<ComponentConfig[]> => {
  const response: AxiosResponse<ComponentConfig[]> = await axios.get<
    ComponentConfig[]
  >(`${BASE_URL}/api/admin/config`);
  return response.data;
};

export const updateComponentConfig = async (
  updatedConfig: ComponentConfig[]
): Promise<void> => {
  await axios.put<void>(`${BASE_URL}/api/admin/config`, updatedConfig);
};
