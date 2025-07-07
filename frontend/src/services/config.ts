import axios from "axios";
import type { ComponentConfig } from "../types/config";

export const fetchComponentConfig = async () => {
  return axios.get("/api/admin/config");
};

export const updateComponentConfig = async (
  updatedConfig: ComponentConfig[]
) => {
  return axios.put("/api/admin/config", updatedConfig);
};
