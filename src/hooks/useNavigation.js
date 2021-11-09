import { useEffect, useState } from "react";

const useNavigation = () => {
  const [step, setStep] = useState(1);

  const onClickNext = (currentStep) => {
    const nextStep = currentStep + 1;
    if (nextStep < step) {
      setStep(currentStep);
    }
    setStep(nextStep);
  };

  return { onClickNext, step };
};

export default useNavigation;
