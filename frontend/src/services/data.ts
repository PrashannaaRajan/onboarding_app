import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserData = async () => {
  const response = await axios.get(`${BASE_URL}/api/data`);
  return response.data;
};
