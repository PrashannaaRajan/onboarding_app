import { Stepper, Step, StepLabel, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Onboarding = () => {
  const location = useLocation();
  const steps = ["Login", "Section 1", "Section 2"];
  let activeStep = 0;
  if (location.pathname === "/section-1") {
    activeStep = 1;
  } else if (location.pathname === "/section-2") {
    activeStep = 2;
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Outlet />
    </Container>
  );
};

export default Onboarding;
