export const validateSectionForm = (config: string[], formData: FormData) => {
  const errors: Record<string, string> = {};

  config.forEach((component) => {
    if (component === "address") {
      if (!formData.street) errors.street = "Required";
      if (!formData.city) errors.city = "Required";
      if (!formData.state) errors.state = "Required";
      if (!formData.zip) errors.zip = "Required";
    } else if (component === "birthdate") {
      if (!formData.birthdate) {
        errors.birthdate = "Required";
      } else {
        const selectedDate = new Date(formData.birthdate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          errors.birthdate = "Date cannot be in the future";
        }
      }
    } else {
      if (!formData[component]) {
        errors[component] = "Required";
      }
    }
  });

  return errors;
};

type FormData = Record<string, string>;
