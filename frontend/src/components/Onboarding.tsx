import { Stepper, Step, StepLabel, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store";

const Onboarding = () => {
  const location = useLocation();
  const sectionCount = useSelector((state: RootState) => state.admin.sectionCount);

  // Dynamically generate steps: "Login", "Section 1", ..., "Section N"
  const steps = ["Login", ...Array.from({ length: sectionCount }, (_, i) => i + 1).map((n) => `Section ${n}`)];

  // Determine active step based on pathname
  let activeStep = 0;
  const match = location.pathname.match(/^\/section-(\d+)$/);
  if (match) {
    const sectionNum = parseInt(match[1], 10);
    activeStep = sectionNum; // +1 because "Login" is step 0
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
