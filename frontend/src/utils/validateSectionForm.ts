export const validateSectionForm = (
  components: string[],
  formData: any
): string | null => {
  for (const component of components) {
    if (component === "address") {
      const requiredFields = ["street", "city", "state", "zip"];
      for (const field of requiredFields) {
        if (!formData[field]) return `${field} is required`;
      }
    } else if (component === "birthdate") {
      const birthdate = formData.birthdate;
      if (!birthdate) return "Birthdate is required";
      const selectedDate = new Date(birthdate);
      const today = new Date();
      if (selectedDate > today) return "Birthdate cannot be in the future";
    } else if (!formData[component])
      return `${component.replace("_", " ")} is required`;
  }
  return null;
};
