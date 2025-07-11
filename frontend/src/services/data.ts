import axios, { type AxiosResponse } from "axios";
import type { User } from "../types/user";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserData = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(
    `${BASE_URL}/api/data`
  );
  return response.data;
};
