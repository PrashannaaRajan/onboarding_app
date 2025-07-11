import axios, { type AxiosResponse } from "axios";
import type { AuthResponse } from "../types/response";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${BASE_URL}/api/auth`,
    {
      email,
      password,
    }
  );
  return response.data;
};
