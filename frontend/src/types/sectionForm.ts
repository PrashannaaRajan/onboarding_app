export type SectionForm = {
  about_me?: string;
  birthdate?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type FieldErrors = Partial<Record<keyof SectionForm, string>>;
