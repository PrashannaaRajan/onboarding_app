import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/api/auth", { email, password });
  return response.data;
};
