import axios from "axios";

export const getUserData = async () => {
  return axios.get("/api/data");
};
