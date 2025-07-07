import axios from "axios";
import type { SectionForm } from "../types/sectionForm";

export const submitSectionData = async (
  section: number,
  data: SectionForm,
  token: string
) => {
  return axios.post(`/api/onboarding/page/${section}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
