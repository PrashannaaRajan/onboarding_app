import axios from "axios";
import type { SectionForm } from "../types/sectionForm";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const submitSectionData = async (
  section: number,
  data: SectionForm,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/api/onboarding/section/${section}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
