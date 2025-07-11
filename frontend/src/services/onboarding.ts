import axios from "axios";
import type { SectionForm } from "../types/sectionForm";
import type { sectionSaveResponse } from "../types/response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const submitSectionData = async (
  section: number,
  data: SectionForm,
  token: string
): Promise<sectionSaveResponse> => {
  const response = await axios.post(
    `${BASE_URL}/api/onboarding/section/${section}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
